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

export async function verify(req: any): Promise<any> {
  const headers = req['rawHeaders'];
  let token = '';
  headers.forEach((header: any) => {
    if (header.startsWith('Bearer')) {
      token = header.slice(7);
    }
  });
  if (!token) throw new UnauthorizedException();
  isLogged(token)
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

export const daysComplete = (data, key) => {
  // keep empty days, so that we complete the object with these days and their counter=0
  let flag = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  data.forEach((obj) => {
    const day = obj.day;
    obj[key] = parseInt(obj[key]);
    const index = flag.indexOf(day);
    flag = flag.slice(0, index).concat(flag.slice(index+1, flag.length));
  })
  flag.forEach((day) => {
    data.push({
      day: day,
      [key]: 0,
    })
  })
  return data;
}

export const monthlyCountsParseInt = (data, key) => {
  return data.map((obj) => {
    return {
      month: obj.month,
      [key]: parseInt(obj[key]),
    }
  })
}