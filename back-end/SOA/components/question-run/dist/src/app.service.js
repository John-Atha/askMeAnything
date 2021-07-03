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
                url: new RegExp('answers'),
                method: 'post',
                needsAuth: true,
            },
            {
                url: new RegExp('answers/[0-9]+'),
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
        ];
        const urls = [
            {
                url: '/answers',
                method: 'post',
                needsAuth: true,
            },
            {
                url: '/answers/[0-9]+',
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