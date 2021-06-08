import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  description(reqParams: any): any {
    if (!reqParams.url || !reqParams.method) {
      throw new BadRequestException('Url / method not given');
    }
    const url = reqParams.url;
    const method = reqParams.method;
    console.log(reqParams.url);
    console.log(reqParams.method);
    let res = {
      exists: false,
      needsAuth: false,
    }
    const urls = [
      {
        url: new RegExp('users/[0-9]+/questions/stats/monthly'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('users/[0-9]+/questions/stats/daily'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('users/[0-9]+/answers/stats/monthly'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('users/[0-9]+/answers/stats/daily'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('users/[0-9]+/answered/stats/monthly'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('users/[0-9]+/answered/stats/daily'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('users/ranking'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('questions/stats/monthly'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('questions/stats/daily'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('answers/stats/monthly'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('answers/stats/daily'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('keywords/[0-9]+/stats/monthly'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('keywords/[0-9]+/stats/daily'),
        method: 'get',
        needsAuth: false,
      },
    ]
    for (let i=0; i<urls.length; i++) {
      if (urls[i].url.test(url) && urls[i].method===method) {
        console.log('found at');
        console.log(urls[i]);
        res.exists = true;
        res.needsAuth = urls[i].needsAuth;
      }
    }
    return res;
  }
}
