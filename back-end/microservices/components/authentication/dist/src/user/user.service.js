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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const methods_1 = require("../../general_methods/methods");
const constants_auth_1 = require("../../constants_auth");
const async_calls_1 = require("../../async_calls/async_calls");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let UserService = class UserService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(createUserDto) {
        if (createUserDto.password === createUserDto.confirmation) {
            const allowed = await this.validRegister(createUserDto.username, createUserDto.email);
            if (allowed) {
                const user = await this.manager.create(user_entity_1.User, createUserDto);
                const hash = bcrypt.hashSync(user.password, saltRounds);
                user.password = hash;
                const res = await this.manager.save(user);
                async_calls_1.choreoPost('post', { id: res.id }, -1, 'user')
                    .then(response => {
                    console.log(response.data);
                })
                    .catch(err => {
                    console.log(err);
                });
                return res;
            }
            else {
                throw new common_1.BadRequestException(`Username/email already exist.`);
            }
        }
        else {
            throw new common_1.BadRequestException("Passwords don't match.");
        }
    }
    async findAll(params) {
        const res = await this.manager.find(user_entity_1.User);
        return methods_1.paginate(res, params);
    }
    async findOne(id) {
        const user = await this.manager.findOne(user_entity_1.User, id);
        if (!user) {
            throw new common_1.NotFoundException(`User '${id}' not found.`);
        }
        return user;
    }
    async update(id, updateUserDto, req) {
        return this.manager.transaction(async (manager) => {
            const user = await manager.findOne(user_entity_1.User, id);
            const req_user_id = methods_1.verify(req);
            if (!user) {
                throw new common_1.NotFoundException(`User ${id} not found.`);
            }
            else if (user.id !== req_user_id) {
                throw new common_1.UnauthorizedException();
            }
            else {
                const valid = await this.validUpdate(user.id, updateUserDto.username, updateUserDto.email);
                if (valid) {
                    const newUser = await manager.merge(user_entity_1.User, user, updateUserDto);
                    return manager.save(newUser);
                }
                else {
                    throw new common_1.BadRequestException(`Username/email already exist.`);
                }
            }
        });
    }
    async pointsUpd(req, id, how) {
        return this.manager.transaction(async (manager) => {
            const user_id = methods_1.verify(req);
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user) {
                throw new common_1.NotFoundException(`User ${id} not found.`);
            }
            if (how === 'incr')
                user.points++;
            else if (user.points > 0)
                user.points--;
            return manager.save(user);
        });
    }
    async remove(id, req) {
        return this.manager.transaction(async (manager) => {
            const req_user_id = methods_1.verify(req);
            const user = await manager.findOne(user_entity_1.User, id);
            if (!user) {
                throw new common_1.NotFoundException(`User ${id} not found.`);
            }
            else if (id !== req_user_id) {
                throw new common_1.UnauthorizedException();
            }
            const res = await manager.delete(user_entity_1.User, id);
            async_calls_1.choreoPost('delete', { id }, id, 'user')
                .then(response => {
                console.log(response.data);
            })
                .catch(err => {
                console.log(err);
            });
            return res;
        });
    }
    async validRegister(username, email) {
        const res1 = await this.manager.findOne(user_entity_1.User, { username: username });
        const res2 = await this.manager.findOne(user_entity_1.User, { email: email });
        return !res1 && !res2;
    }
    async validUpdate(id, username, email) {
        const res1 = await this.manager.findOne(user_entity_1.User, { username: username });
        const res2 = await this.manager.findOne(user_entity_1.User, { email: email });
        return ((!res1 || (res1 && res1['id'] === id)) &&
            (!res2 || (res2 && res2['id'] === id)));
    }
    identify(req) {
        const headers = req['rawHeaders'];
        let token = '';
        headers.forEach((header) => {
            if (header.startsWith('Bearer')) {
                token = header.slice(7);
            }
        });
        let decoded = {};
        try {
            decoded = jwt.verify(token, constants_auth_1.jwtConstants.secret);
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException();
        }
        console.log({
            username: decoded['username'],
            id: decoded['sub'],
        });
        return {
            username: decoded['username'],
            id: decoded['sub'],
        };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map