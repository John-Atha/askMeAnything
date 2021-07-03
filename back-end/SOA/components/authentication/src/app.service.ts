import { Injectable } from '@nestjs/common';

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
      {
        url: new RegExp('/'),
        method: 'get',
        needsAuth: false,
      },
    ];
    const urls = [
      {
        url: '/users',
        method: 'get',
        needsAuth: false,
      },
      {
        url: '/users',
        method: 'post',
        needsAuth: false,
      },
      {
        url: '/users/[0-9]+',
        method: 'get',
        needsAuth: false,
      },
      {
        url: '/users/[0-9]+',
        method: 'patch',
        needsAuth: true,
      },
      {
        url: '/users/[0-9]+',
        method: 'delete',
        needsAuth: true,
      },
      {
        url: '/login',
        method: 'post',
        needsAuth: false,
      },
      {
        url: '/logged',
        method: 'post',
        needsAuth: true,
      },
      {
        url: '/',
        method: 'get',
        needsAuth: false,
      },
    ]

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
