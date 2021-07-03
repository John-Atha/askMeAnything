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
                url: new RegExp('questions/monthly/[0-9]+/[0-9]+'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('questions/yearly/[0-9]+'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('questions'),
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
                url: new RegExp('users/[0-9]+/questions/monthly/[0-9]+/[0-9]+'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('users/[0-9]+/questions/yearly/[0-9]+'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('users/[0-9]+/questions'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('answers/monthly/[0-9]+/[0-9]+'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('answers/yearly/[0-9]+'),
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
                url: new RegExp('answers'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('users/[0-9]+/answers/monthly/[0-9]+/[0-9]+'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('users/[0-9]+/answers/yearly/[0-9]+'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('users/[0-9]+/answers'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('users/[0-9]+/answered/monthly/[0-9]+/[0-9]+'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('users/[0-9]+/answered/yearly/[0-9]+'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('users/[0-9]+/answered'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('users/ranking'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('keywords/[0-9]+/questions/monthly/[0-9]+/[0-9]+'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('keywords/[0-9]+/questions/yearly/[0-9]+'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('keywords/[0-9]+/questions'),
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
            {
                url: new RegExp('keywords/stats'),
                method: 'get',
                needsAuth: false,
            },
            {
                url: new RegExp('/'),
                method: 'get',
                needsAuth: false,
            },
        ];
        const urls = [
            {
                url: '/questions/monthly/[0-9]+/[0-9]+',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/questions/yearly/[0-9]+',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/questions',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/questions/stats/monthly',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/questions/stats/daily',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/users/[0-9]+/questions/monthly/[0-9]+/[0-9]+',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/users/[0-9]+/questions/yearly/[0-9]+',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/users/[0-9]+/questions',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/answers/monthly/[0-9]+/[0-9]+',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/answers/yearly/[0-9]+',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/answers/stats/monthly',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/answers/stats/daily',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/answers',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/users/[0-9]+/answers/monthly/[0-9]+/[0-9]+',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/users/[0-9]+/answers/yearly/[0-9]+',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/users/[0-9]+/answers',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/users/[0-9]+/answered/monthly/[0-9]+/[0-9]+',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/users/[0-9]+/answered/yearly/[0-9]+',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/users/[0-9]+/answered',
                method: 'get',
                needsAuth: false,
            },
            {
                url: 'users/ranking',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/keywords/[0-9]+/questions/monthly/[0-9]+/[0-9]+',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/keywords/[0-9]+/questions/yearly/[0-9]+',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/keywords/[0-9]+/questions',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/keywords/[0-9]+/stats/monthly',
                method: 'get',
                needsAuth: false,
            },
            {
                url: '/keywords/[0-9]+/stats/daily',
                method: 'get',
                needsAuth: false,
            },
            {
                url: 'keywords/stats',
                method: 'get',
                needsAuth: false,
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