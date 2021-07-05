"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const methods_1 = require("../general_methods/methods");
const main_1 = require("./main");
let AppService = class AppService {
    constructor(manager) {
        this.manager = manager;
        console.log(`Analytics service created, I am checking last messages.`);
        this.myAddress = 'https://askmeanything-micro-analytics.herokuapp.com';
        this.pool = require('redis-connection-pool')('myRedisPool', {
            url: process.env.REDIS_URL,
            max_clients: main_1.TotalConnections,
            perform_checks: false,
            database: 0,
        });
        this.lastMessagesCheck();
    }
    getHello() {
        return 'Hello World!';
    }
    async choreoHandle(body, fresh) {
        if (fresh)
            methods_1.handleChoreoMessage(body, this.manager, this.pool, fresh);
        else
            return methods_1.handleChoreoMessage(body, this.manager, this.pool, fresh);
    }
    async lastMessagesCheck() {
        await this.pool.hget('choreographer', 'messages', async (err, data) => {
            const currMessages = JSON.parse(data) || [];
            const s = currMessages.length;
            let to_be_checked = [];
            if (s > 100)
                to_be_checked = currMessages.slice(s - 100, s);
            else
                to_be_checked = currMessages;
            await this.pool.hget('analytics_seen', 'messages', async (err, data) => {
                let seenSet = new Set();
                let seenArray = JSON.parse(data) || [];
                for (let message of seenArray)
                    seenSet.add(parseInt(message));
                const newMessages = [];
                const newIDs = [];
                let has_unseen = false;
                for (let message of to_be_checked) {
                    if (!seenSet.has(parseInt(message.id))) {
                        has_unseen = true;
                        console.log(`I haven't handled message ${message.id}`);
                        newIDs.push(message.id);
                        newMessages.push(message);
                    }
                }
                this.pool.hset('analytics_seen', 'messages', JSON.stringify(seenArray.concat(newIDs)), async (err, data) => {
                    console.log('I updated the seen messages');
                });
                for (let newMessage of newMessages) {
                    if (newMessage.src === this.myAddress)
                        continue;
                    try {
                        await this.choreoHandle(newMessage, false);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                if (!has_unseen) {
                    console.log('No unseen messages found.');
                }
            });
        });
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map