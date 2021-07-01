import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { getOneQuestion, isLogged } from 'async_calls/async_calls';
import { getOneUser } from 'async_calls/async_calls';
import { ChoreoObjectDto } from 'src/choreoObject.dto';
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

export async function verify(req: any): Promise<any> {
  const headers = req['rawHeaders'];
  let token = '';
  headers.forEach((header: any) => {
    if (header.startsWith('Bearer')) {
      token = header.slice(7);
    }
  });
  if (!token) throw new UnauthorizedException();
  return  isLogged(token)
          .then(response => {
            const res = response.data;
            console.log(res);
            if (!res) throw new UnauthorizedException();
            return res['id'];  
          })
          .catch(err => {
            throw new UnauthorizedException();
          })
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

export const getToken = (req: any) => {
  const headers = req['rawHeaders'];
  let token = '';
  headers.forEach((header) => {
    if (header.startsWith('Bearer')) {
      token = header.slice(7);
    }
  });
  //console.log(`token: ${token}`);
  return token;
}

export async function handleChoreoMessage(body: ChoreoObjectDto, manager: EntityManager): Promise<any> {
  const { action, object, entryId, targetEntity } = body;
  console.log('--->>Choreographer passed me the:');
  console.log(body);
  let entity = null;
  if (targetEntity === 'user') entity = User;
  else if (targetEntity === 'question') entity = Question;
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
    console.log(`${targetEntity} with id '${res['id']}' updated successfully.`);
  }
  return 'OK';
}