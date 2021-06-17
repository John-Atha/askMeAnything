import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { getOneQuestion, isLogged } from 'async_calls/async_calls';
import { getOneUser } from 'async_calls/async_calls';

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