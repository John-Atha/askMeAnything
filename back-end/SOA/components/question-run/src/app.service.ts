import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  description(reqParams: any): any {
    /*if (!reqParams.url || !reqParams.method) {
      throw new BadRequestException('Url / method not given');
    }*/
    const url = reqParams.url || 'dummy';
    const method = reqParams.method || 'get';
    console.log(reqParams.url);
    console.log(reqParams.method);
    let res = {
      exists: false,
      needsAuth: false,
    }
    const urlsMatch = [
      {
        url: new RegExp('answers'),
        method: 'post',
        needsAuth: true,
      },
      {
        url: new RegExp('answers/[0-9]+') /*'questions/_'*/,
        method: 'patch',
        needsAuth: true,
      },
      {
        url: new RegExp('answers/[0-9]+'),
        method: 'delete',
        needsAuth: true,
      },
      {
        url: new RegExp('answer-upvotes'),
        method: 'post',
        needsAuth: true,
      },
      {
        url: new RegExp('answer-upvotes/[0-9]+'),
        method: 'delete',
        needsAuth: true,
      },
      {
        url: new RegExp('question-upvotes'),
        method: 'post',
        needsAuth: true,
      },
      {
        url: new RegExp('question-upvotes/[0-9]+'),
        method: 'delete',
        needsAuth: true,
      },
      {
        url: new RegExp('/'),
        method: 'get',
        needsAuth: false,
      },
    ];
    const urls = [
      {
        url: '/answers',
        method: 'post',
        needsAuth: true,
      },
      {
        url: '/answers/[0-9]+' /*'questions/_'*/,
        method: 'patch',
        needsAuth: true,
      },
      {
        url: '/answers/[0-9]+',
        method: 'delete',
        needsAuth: true,
      },
      {
        url: '/answer-upvotes',
        method: 'post',
        needsAuth: true,
      },
      {
        url: '/answer-upvotes/[0-9]+',
        method: 'delete',
        needsAuth: true,
      },
      {
        url: '/question-upvotes',
        method: 'post',
        needsAuth: true,
      },
      {
        url: '/question-upvotes/[0-9]+',
        method: 'delete',
        needsAuth: true,
      },
      {
        url: '/',
        method: 'get',
        needsAuth: false,
      },
    ];  
    for (let i=0; i<urlsMatch.length; i++) {
      if (urlsMatch[i].url.test(url) && urlsMatch[i].method===method) {
        console.log('found at');
        console.log(urlsMatch[i]);
        res.exists = true;
        res.needsAuth = urlsMatch[i].needsAuth;
      }
    }
    res['endpoints'] = urls;
    return res;
  }
}
