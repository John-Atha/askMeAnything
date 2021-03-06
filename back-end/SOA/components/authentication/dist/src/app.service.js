"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    description(reqParams) {
        const url = reqParams.url || 'dummy';
        const method = reqParams.method || 'get';
        console.log(reqParams.url);
        console.log(reqParams.method);
        let res = {
            exists: false,
            needsAuth: false,
        };
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
        ];
        for (let i = 0; i < urlsMatch.length; i++) {
            if (urlsMatch[i].url.test(url) && urlsMatch[i].method === method) {
                console.log('found at');
                console.log(urlsMatch[i]);
                res.exists = true;
                res.needsAuth = urlsMatch[i].needsAuth;
            }
        }
        res['endpoints'] = urls;
        return res;
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map