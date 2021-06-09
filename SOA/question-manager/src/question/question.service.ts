import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { paginate, verify } from '../../general-methods/methods';
import { answerCountUpvotes, updateQuestionKeywords, createQuestion, deleteQuestion, getOneKeyword, getOneQuestion, getOneUser, updateQuestion, questionIsUpvoted } from 'async_calls/async_calls';

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(req: any, createQuestionDto: CreateQuestionDto): Promise<any> {
    return this.manager.transaction(async () => {
      const user_id = await verify(req);
      console.log(`I see user ${user_id}`);
      const allowed = await this.validateCreate(createQuestionDto.title);
      if (!allowed) {
        throw new BadRequestException('Title already exists.');
      }
      //const owner = await manager.findOne(User, user_id);
      const owner = await getOneUser({ id: user_id });
      if (!owner.data) {
        throw new UnauthorizedException();
      }
      createQuestionDto['owner'] = {
        id: user_id,
      };/*
      const question = await manager.create(Question, createQuestionDto);
      question.owner = owner;
      return manager.save(question);*/
      console.log('I am creating question.')
      const question = await createQuestion(createQuestionDto, owner.data);
      return question.data;
    });
  }

  async findOne(id: number): Promise<any> {
    let question = null;
    /*question = await this.manager.findOne(Question, id, {
      relations: ['owner', 'upvotes'],
    });*/
    const params = {
      id,
      owner: true,
      upvotes: true,
    };
    question = await getOneQuestion(params);
    console.log('question data:')
    console.log(question.data);
    if (!question.data) {
      throw new NotFoundException(`Question '${id}' not found.`);
    }
    /*const count = await this.manager.query(
      `SELECT COUNT(*) FROM public."question_upvote" WHERE public."question_upvote"."questionId"=${id}`,
    );
    question.data['upvotesCount'] = await parseInt(count[0]['count']);*/
    return question.data;
  }

  async update(req: any, id: number, updateQuestionDto: UpdateQuestionDto): Promise<any> {
    return this.manager.transaction(async () => {
      const user_id = await verify(req);
      const allowed = await this.validateUpdate(id, updateQuestionDto.title);
      if (!allowed) {
        throw new BadRequestException('Title already exists.');
      }
      const params = {
        id,
        owner: true,
      }
      const question = await getOneQuestion(params);
      /*const question = await manager.findOne(Question, id, {
        relations: ['owner'],
      });*/
      if (!question.data) {
        throw new NotFoundException(`Question ${id} not found.`);
      }
      console.log(question.data);
      if (question.data.owner.id !== user_id) {
        throw new BadRequestException(
          "You cannot update another user's question",
        );
      }
      /*manager.merge(Question, question, updateQuestionDto);
      return manager.save(question);*/
      const newQuestion = await updateQuestion(id, updateQuestionDto);
      return newQuestion.data;
    });
  }

  async remove(req: any, id: number): Promise<any> {
    return this.manager.transaction(async () => {
      const user_id = await verify(req);
      const params = {
        id,
        owner: true,
      }
      const question = await getOneQuestion(params);
      /*const question = await manager.findOne(Question, id, {
        relations: ['owner'],
      });*/
      if (!question.data) {
        throw new NotFoundException(`Question ${id} not found.`);
      }
      if (question.data.owner.id !== user_id) {
        throw new BadRequestException(
          "You cannot delete another user's question.",
        );
      }
      return deleteQuestion(id);
    });
  }

  async findQuestionsAnswers(id: number, paramsInit): Promise<any> {
    //const question = await this.manager.findOne(Question, id, { relations: ['answers', 'answers.owner'] });
    const params = {
      id,
      answers: true,
      answersOwner: true,
    };
    const question = await getOneQuestion(params);
    if (!question.data) {
      throw new NotFoundException(`Question ${id} not found.`);
    }
    console.log(question.data.answers);
    let answers = await this.withCountAnswersUpvotes(question.data.answers);
    answers = answers.sort((a, b) =>
      a['upvotesCount'] < b['upvotesCount'] ? 1 : -1,
    );
    //const answers = paginate(question.answers, params);
    //return this.withCountAnswersUpvotes(answers);
    return paginate(answers, paramsInit);
  }

  async withCountAnswersUpvotes(answers): Promise<any> {
    for (let i = 0; i < answers.length; i++) {
      const count = await answerCountUpvotes(answers[i].id);
      answers[i]['upvotesCount'] = await parseInt(count.data[0]['count']);
    };
    return answers;
  }

  async findUpvotes(id: number, paramsInit): Promise<any> {
    //const question = await this.manager.findOne(Question, id, { relations: ['upvotes', 'upvotes.owner'] });
    const params = {
      id,
      upvotes: true,
      upvotesOwner: true,
    };
    const question = await getOneQuestion(params);
    if (!question.data) {
      throw new NotFoundException(`Question ${id} not found.`);
    }
    return paginate(question.data.upvotes, paramsInit);
  }

  async findKeywords(id: number): Promise<any> {
    //const question = await this.manager.findOne(Question, id, { relations: ['keywords'] });
    const params = {
      id,
      keywords: true,
    };
    const question = await getOneQuestion(params);
    if (!question.data) {
      throw new NotFoundException(`Question '${id}' not found.`);
    }
    return question.data.keywords;
  }

  async attachKeyword(req: any, question_id: number, keyword_id: number) {
    return this.manager.transaction(async () => {
      const user_id = await verify(req);
      //const user = await manager.findOne(User, user_id);
      const user = await getOneUser({ id: user_id });
      if (!user.data) {
        throw new UnauthorizedException();
      }
      //const question = await manager.findOne(Question, question_id, { relations: ['owner', 'keywords'] });
      const params = {
        id: question_id,
        owner: true,
        keywords: true,
      };
      const question = await getOneQuestion(params);
      if (!question.data) {
        throw new NotFoundException(`Question '${question_id} not found.`);
      }
      if (question.data.owner.id !== user.data.id) {
        console.log(question.data.owner);
        console.log(user.data);
        throw new BadRequestException(`Only the question's owner can modify it.`);
      }
      //const keyword = await manager.findOne(Keyword, keyword_id);
      const keyword = await getOneKeyword({id: keyword_id});
      if (!keyword.data) {
        throw new NotFoundException(`Keyword '${keyword_id} not found.`);
      }
      const old_keywords = question.data.keywords;
      old_keywords.push(keyword.data);
      //question.keywords = old_keywords;
      //return manager.save(question);
      let newQuestion =  await updateQuestionKeywords(question_id, old_keywords);
      newQuestion = await getOneQuestion(params);
      return newQuestion.data;
    });
  }

  async detachKeyword(req: any, question_id: number, keyword_id: number) {
    return this.manager.transaction(async () => {
      const user_id = await verify(req);
      //const user = await manager.findOne(User, user_id);
      const user = await getOneUser({ id: user_id });
      if (!user.data) {
        throw new UnauthorizedException();
      }
      //const question = await manager.findOne(Question, question_id, { relations: ['owner', 'keywords'] });
      const params = {
        id: question_id,
        owner: true,
        keywords: true,
      };
      const question = await getOneQuestion(params);
      if (!question.data) {
        throw new NotFoundException(`Question '${question_id} not found.`);
      }
      console.log(question.data.owner.id);
      console.log(user_id);
      if (question.data.owner.id !== user_id) {
        throw new BadRequestException(`Only the question's owner can modify it.`);
      }
      //const keyword = await manager.findOne(Keyword, keyword_id);
      const keyword = await getOneKeyword({id: keyword_id});
      if (!keyword.data) {
        throw new NotFoundException(`Keyword '${keyword_id} not found.`);
      }
      const keywordsIds = [];
      question.data.keywords.forEach((word) => {
        keywordsIds.push(word.id);
      });
      let index = -1;
      for (let i = 0; i < question.data.keywords.length; i++) {
        if (question.data.keywords[i].id === keyword.data.id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        question.data.keywords = question.data.keywords
          .slice(0, index)
          .concat(question.data.keywords.slice(index + 1, question.data.keywords.length));
          let newQuestion =  await updateQuestionKeywords(question_id, question.data.keywords);
          newQuestion = await getOneQuestion(params);
          return newQuestion.data;
          }
      else {
        throw new BadRequestException(
          `Keyword '${keyword_id}' not in question '${question_id}'`,
        );
      }
    });
  }

  async isUpvoted(req: any, id: number): Promise<any> {
    return this.manager.transaction(async () => {
      const user_id = await verify(req);
      //const user = await manager.findOne(User, user_id);
      const user = await getOneUser({ id: user_id });
      if (!user.data) {
        throw new UnauthorizedException();
      }
      //const question = await manager.findOne(Question, id);
      const params = {
        id,
      };
      const question = await getOneQuestion(params);
      if (!question.data) {
        throw new NotFoundException(`Question ${id} not found.`);
      }
      //const upvote = await manager.find(QuestionUpvote, { owner: user, question: question });
      const upvote = await questionIsUpvoted(user_id, id);
      if (!upvote.data.length) {
        return {
          upvoted: false,
        };
      }
      return {
        upvoted: true,
        id: upvote.data[0].id,
      };
    });
  }

  async validateCreate(title: string): Promise<boolean> {
    //const res = await this.manager.find(Question, { title: title });
    const params = { title };
    const res = await getOneQuestion(params);
    return !res.data;
  }

  async validateUpdate(id: number, title: string): Promise<boolean> {
    //const res = await this.manager.findOne(Question, { title: title });
    const params = { title };
    const res = await getOneQuestion(params);
    return !res.data || (res.data && res.data['id'] === id);
  }
}
