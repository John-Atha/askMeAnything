import { BadRequestException, NotFoundException } from '@nestjs/common';
import { countOneAnswerUpvotes, countOneQuestionUpvotes, getOneQuestion, getOneUser } from 'async_calls/async_calls';
import { Answer } from 'src/answer/entities/answer.entity';
import { ChoreoObjectDto } from 'src/choreoObject.dto';
import { Keyword } from 'src/keyword/entities/keyword.entity';
import { Question } from 'src/question/entities/question.entity';
import { User } from 'src/user/entities/user.entity';
import { EntityManager } from 'typeorm';

export const validateParams = (params) => {
  if (params.start !== undefined) {
    if (!parseInt(params.start)) {
      throw new BadRequestException(`Invalid start parameter.`);
    }
  }
  if (params.end !== undefined) {
    if (!parseInt(params.end)) {
      throw new BadRequestException(`Invalid end parameter.`);
    }
  }
};

export const paginate = (res, params) => {
  validateParams(params);
  if (!res.length) {
    return res;
  }
  if (params.start > res.length) {
    return [];
  }
  const start = parseInt(params.start) - 1 || 0;
  const end =
    parseInt(params.end) || (parseInt(params.end) === 0 ? 0 : res.length);
  console.log(`start: ${start}`);
  console.log(`end: ${end}`);
  if (start >= end || start <= -1 || end === 0) {
    throw new BadRequestException('Invalid parameters');
  }
  return res.slice(start, end);
};

export async function addNestedOwnerToObj(obj: any, user_id: number): Promise<any> {
    return getOneUser(user_id)
    .then(response => {
        obj['owner'] = response.data;
        return obj;
    })
    .catch(err => {
        throw new NotFoundException(`User '${user_id}' not found.`);
    })
}

export async function addNestedOwnerToObjList(objects: any): Promise<any> {
    for (let i=0; i<objects.length; i++) {
        objects[i] = await addNestedOwnerToObj(objects[i], objects[i].owner.id);
    }
    return objects;
}

export async function countQuestionsUpvotes(objects: any): Promise<any> {
    for (let i=0; i<objects.length; i++) {
        await countOneQuestionUpvotes(objects[i].id)
        .then(response => {
            objects[i]['upvotesCount'] = response.data.upvotes;
        })
        .catch(err => {
            throw new NotFoundException(`Question '${objects[i].id}' not found.`);
        })
    }
    return objects;
}

export async function countAnswersUpvotes(objects: any): Promise<any> {
    for (let i=0; i<objects.length; i++) {
        await countOneAnswerUpvotes(objects[i].id)
        .then(response => {
            objects[i]['upvotesCount'] = response.data.upvotes;
        })
        .catch(err => {
            throw new NotFoundException(`Answer '${objects[i].id}' not found.`);
        })
    }
    return objects;
}

export async function addNestedQuestionToObj(obj: any, question_id: number): Promise<any> {
  return getOneQuestion(question_id)
  .then(response => {
      obj['question'] = response.data;
      return obj;
  })
  .catch(err => {
      throw new NotFoundException(`Question '${question_id}' not found.`);
  })
}

export async function addNestedQuestionToObjList(objects: any): Promise<any> {
  for (let i=0; i<objects.length; i++) {
      objects[i] = await addNestedQuestionToObj(objects[i], objects[i].question.id);
  }
  return objects;
}

export async function handleChoreoMessage(body: ChoreoObjectDto, manager: EntityManager): Promise<any> {
  const { action, object, entryId, targetEntity } = body;
  console.log('--->>Choreographer passed me the:');
  console.log(body);
  let entity = null;
  if (targetEntity === 'user') entity = User;
  else if (targetEntity === 'question') entity = Question;
  else if (targetEntity === 'answer') entity = Answer;
  else if (targetEntity === 'keyword') entity = Keyword;
  else if (targetEntity === 'question-keywords') {
    if (action!=='patch') return 'OK';
    console.log('* I am interested in it.');
    console.log(entryId);
    const question = await manager.findOne(Question, { id: entryId });
    if (!question) throw new NotFoundException(`Question '${entryId}' not found.`);
    console.log(object);
    question.keywords = object;
    const res = await manager.save(question);
    console.log(`Keywords of question '${entryId}' were updated.`);
    return 'OK';
  }
  else return 'OK';
  console.log('* I am interested in it.');
  if (action === 'post') {
    const target = await manager.create(entity, object);
    const res = await manager.save(target);
    console.log(`* New ${targetEntity} with id '${res['id']}' is saved.`);
  }
  else if (action === 'delete') {
    const target = await manager.findOne(entity, { id: entryId });
    if (!target) {
      console.log(`* I did not find ${targetEntity} with id '${entryId}', never mind it was going to be deleted anyway.`);
      return 'OK';
    }
    const res = await manager.delete(entity, { id: entryId });
    console.log(`* ${targetEntity} with id '${entryId}' was deleted successfully.`);
  }
  else if (action==='patch') {
    const target = await manager.findOne(entity, { id: entryId });
    if (!target) throw new NotFoundException(`${targetEntity} '${entryId}' not found.`);
    const newObject = await manager.merge(entity, target, object);
    const res = await manager.save(newObject);
    console.log(`* ${targetEntity} with id '${res['id']}' updated successfully.`);
  }
  return 'OK';
}