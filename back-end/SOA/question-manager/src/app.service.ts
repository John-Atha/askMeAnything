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
        url: new RegExp('questions'),
        method: 'post',
        needsAuth: true,
      },
      {
        url: new RegExp('questions/[0-9]+') /*'questions/_'*/,
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('questions/[0-9]+'),
        method: 'patch',
        needsAuth: true,
      },
      {
        url: new RegExp('questions/[0-9]+'),
        method: 'delete',
        needsAuth: true,
      },
      {
        url: new RegExp('questions/[0-9]+/answers'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('questions/[0-9]+/upvotes'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('questions/[0-9]+/upvoted'),
        method: 'get',
        needsAuth: true,
      },
      {
        url: new RegExp('questions/[0-9]+/keywords'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('questions/[0-9]+/keywords/[0-9]+'),
        method: 'post',
        needsAuth: true,
      },
      {
        url: new RegExp('questions/[0-9]+/keywords/[0-9]+'),
        method: 'delete',
        needsAuth: true,
      },
      {
        url: new RegExp('keywords'),
        method: 'post',
        needsAuth: true,
      },
      {
        url: new RegExp('keywords'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('keywords/[0-9]+'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('answers/[0-9]+'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('answers/[0-9]+/upvotes'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('answers/[0-9]+/upvoted'),
        method: 'get',
        needsAuth: true,
      }
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
