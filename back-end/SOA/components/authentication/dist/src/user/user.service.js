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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const async_calls_1 = require("../async_calls/async_calls");
const methods_1 = require("../../general_methods/methods");
const constants_auth_1 = require("../../constants_auth");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let UserService = class UserService {
    constructor() { }
    async create(createUserDto) {
        if (createUserDto.password === createUserDto.confirmation) {
            return async_calls_1.createUser(createUserDto)
                .then(response => { return response.data; })
                .catch(err => { throw new common_1.BadRequestException(err.response.data.message); });
        }
        else {
            throw new common_1.BadRequestException("Passwords don't match.");
        }
    }
    async findAll(params) {
        const res = await async_calls_1.getAllUsers();
        return methods_1.paginate(res.data, params);
    }
    async findOne(id) {
        const user = await async_calls_1.getOneUser({ id });
        console.log(`user: ${user.data}`);
        if (!user.data) {
            throw new common_1.NotFoundException(`User '${id}' not found.`);
        }
        return user.data;
    }
    async update(id, updateUserDto, req) {
        const req_user_id = methods_1.verify(req);
        if (id !== req_user_id) {
            throw new common_1.UnauthorizedException();
        }
        return async_calls_1.updateUser(id, updateUserDto)
            .then(response => { return response.data; })
            .catch(err => { throw new common_1.BadRequestException(err.response.data.message); });
    }
    async remove(id, req) {
        const req_user_id = methods_1.verify(req);
        if (id !== req_user_id) {
            throw new common_1.UnauthorizedException();
        }
        return async_calls_1.deleteUser(id)
            .then(response => { return response.data; })
            .catch(err => { throw new common_1.BadRequestException(err.response.data.message); });
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
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map