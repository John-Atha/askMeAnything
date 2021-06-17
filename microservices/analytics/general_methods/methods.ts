import { BadRequestException, NotFoundException } from '@nestjs/common';
import { countOneAnswerUpvotes, countOneQuestionUpvotes, getOneUser } from 'async_calls/async_calls';

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