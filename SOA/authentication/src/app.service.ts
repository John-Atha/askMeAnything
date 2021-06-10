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
        url: new RegExp('users'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('users'),
        method: 'post',
        needsAuth: false,
      },
      {
        url: new RegExp('users/[0-9]+'),
        method: 'get',
        needsAuth: false,
      },
      {
        url: new RegExp('users/[0-9]+'),
        method: 'patch',
        needsAuth: true,
      },
      {
        url: new RegExp('users/[0-9]+'),
        method: 'delete',
        needsAuth: true,
      },
      {
        url: new RegExp('login'),
        method: 'post',
        needsAuth: false,
      },
      {
        url: new RegExp('logged'),
        method: 'post',
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
