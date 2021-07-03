import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { paginate, verify } from '../../general-methods/methods';
import { answerCountUpvotes, attachQuestionKeywords, deAttachQuestionKeywords, createQuestion, deleteQuestion, getOneKeyword, getOneQuestion, getOneUser, updateQuestion, questionIsUpvoted } from 'async_calls/async_calls';

@Injectable()
export class QuestionService {
  constructor() {}

  async create(req: any, createQuestionDto: CreateQuestionDto): Promise<any> {
    const user_id = await verify(req);
    const owner = await getOneUser({ id: user_id });
    if (!owner.data) {
      throw new UnauthorizedException();
    }
    createQuestionDto['owner'] = {
      id: user_id,
    };
    return createQuestion(createQuestionDto, owner.data)
           .then(response => { return response.data })
           .catch(err => { throw new BadRequestException(err.response.data.message)});
  }

  async findOne(id: number): Promise<any> {
    let question = null;
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
    return question.data;
  }

  async update(req: any, id: number, updateQuestionDto: UpdateQuestionDto): Promise<any> {
    const user_id = await verify(req);
    const params = {
      id,
      owner: true,
    }
    const question = await getOneQuestion(params);
    if (!question.data) {
      throw new NotFoundException(`Question ${id} not found.`);
    }
    if (question.data.owner.id !== user_id) {
      throw new BadRequestException(
        "You cannot update another user's question",
      );
    }
    return updateQuestion(id, updateQuestionDto)
            .then(response => {return response.data })
            .catch(err => { throw new BadRequestException(err.response.data.message) });
  }

  async remove(req: any, id: number): Promise<any> {
    const user_id = await verify(req);
    const params = {
      id,
      owner: true,
    }
    const question = await getOneQuestion(params);
    if (!question.data) {
      throw new NotFoundException(`Question ${id} not found.`);
    }
    if (question.data.owner.id !== user_id) {
      throw new BadRequestException(
        "You cannot delete another user's question.",
      );
    }
    return deleteQuestion(id);
  }

  async findQuestionsAnswers(id: number, paramsInit): Promise<any> {
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
    /* validate user, question, ownerhsip */
    const user_id = await verify(req);
    const params = {
      id: question_id,
      owner: true,
      keywords: true,
    };
    const question = await getOneQuestion(params);
    if (!question.data) {
      throw new NotFoundException(`Question '${question_id} not found.`);
    }
    if (question.data.owner.id !== user_id) {
      console.log(question.data.owner);
      console.log(user_id);
      throw new BadRequestException(`Only the question's owner can modify it.`);
    }
    await attachQuestionKeywords(question_id, keyword_id)
          .then(response => { console.log(response) })
          .catch(err => { throw new BadRequestException(err.response.data.message)});
    const newQuestion = await getOneQuestion(params);
    return newQuestion.data;
  }

  async detachKeyword(req: any, question_id: number, keyword_id: number) {
    /* validate user, question, ownership */  
    const user_id = await verify(req);
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
    /* remove from list with transaction*/
    await deAttachQuestionKeywords(question_id, keyword_id)
    .then(response => { console.log(response) })
    .catch(err => { throw new BadRequestException(err.response.data.message) });
    const newQuestion = await getOneQuestion(params);
    return newQuestion.data;
    
  }

  async isUpvoted(req: any, id: number): Promise<any> {
    const user_id = await verify(req);
    const user = await getOneUser({ id: user_id });
    if (!user.data) {
      throw new UnauthorizedException();
    }
    const params = {
      id,
    };
    const question = await getOneQuestion(params);
    if (!question.data) {
      throw new NotFoundException(`Question ${id} not found.`);
    }
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
  }

}
