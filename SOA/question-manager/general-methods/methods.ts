import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { isLogged } from 'async_calls/async_calls';

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

export async function verify(req: any): Promise<number> {
  console.log('I am verify');
  const headers = req['rawHeaders'];
  let token = '';
  headers.forEach((header: any) => {
    if (header.startsWith('Bearer')) {
      token = header.slice(7);
    }
  });
  console.log(`token: ${token}`)
  if (!token) throw new UnauthorizedException();
  const response = await isLogged(token);

  /*let decoded = {};
  try {
    decoded = jwt.verify(token, jwtConstants.secret);
  } catch (error) {
    console.log(error);
    throw new UnauthorizedException();
  }*/

  const res = response.data;
  console.log('logged:');
  console.log(res);
  if (!res) throw new UnauthorizedException();
  return res['id'];
};
