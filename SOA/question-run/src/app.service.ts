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
