"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChoreoMessage = exports.getToken = exports.addNestedQuestionToObj = exports.addNestedOwnerToObj = exports.verify = exports.paginate = exports.validateParams = void 0;
const common_1 = require("@nestjs/common");
const async_calls_1 = require("../async_calls/async_calls");
const async_calls_2 = require("../async_calls/async_calls");
const choreoObject_dto_1 = require("../src/choreoObject.dto");
const question_entity_1 = require("../src/question/entities/question.entity");
const user_entity_1 = require("../src/user/entities/user.entity");
const validateParams = (params) => {
    if (params.start !== undefined) {
        if (!parseInt(params.start)) {
            throw new common_1.BadRequestException(`Invalid start parameter.`);
        }
    }
    if (params.end !== undefined) {
        if (!parseInt(params.end)) {
            throw new common_1.BadRequestException(`Invalid end parameter.`);
        }
    }
};
exports.validateParams = validateParams;
const paginate = (res, params) => {
    exports.validateParams(params);
    if (!res.length) {
        return res;
    }
    if (params.start > res.length) {
        return [];
    }
    const start = parseInt(params.start) - 1 || 0;
    const end = parseInt(params.end) || (parseInt(params.end) === 0 ? 0 : res.length);
    console.log(`start: ${start}`);
    console.log(`end: ${end}`);
    if (start >= end || start <= -1 || end === 0) {
        throw new common_1.BadRequestException('Invalid parameters');
    }
    return res.slice(start, end);
};
exports.paginate = paginate;
async function verify(req) {
    const headers = req['rawHeaders'];
    let token = '';
    headers.forEach((header) => {
        if (header.startsWith('Bearer')) {
            token = header.slice(7);
        }
    });
    if (!token)
        throw new common_1.UnauthorizedException();
    return async_calls_1.isLogged(token)
        .then(response => {
        const res = response.data;
        console.log(res);
        if (!res)
            throw new common_1.UnauthorizedException();
        return res['id'];
    })
        .catch(err => {
        throw new common_1.UnauthorizedException();
    });
}
exports.verify = verify;
;
async function addNestedOwnerToObj(obj, user_id) {
    return async_calls_2.getOneUser(user_id)
        .then(response => {
        obj['owner'] = response.data;
        return obj;
    })
        .catch(err => {
        throw new common_1.NotFoundException(`User '${user_id}' not found.`);
    });
}
exports.addNestedOwnerToObj = addNestedOwnerToObj;
async function addNestedQuestionToObj(obj, question_id) {
    return async_calls_1.getOneQuestion(question_id)
        .then(response => {
        obj['question'] = response.data;
        return obj;
    })
        .catch(err => {
        throw new common_1.NotFoundException(`Question '${question_id}' not found.`);
    });
}
exports.addNestedQuestionToObj = addNestedQuestionToObj;
const getToken = (req) => {
    const headers = req['rawHeaders'];
    let token = '';
    headers.forEach((header) => {
        if (header.startsWith('Bearer')) {
            token = header.slice(7);
        }
    });
    return token;
};
exports.getToken = getToken;
async function handleChoreoMessage(body, manager, pool, fresh) {
    const { action, object, entryId, targetEntity } = body;
    console.log('--->>Choreographer passed me the:');
    console.log(body);
    let entity = null;
    if (fresh) {
        await pool.hget('answers_seen', 'messages', async (err, data) => {
            let seen = JSON.parse(data) || [];
            console.log('I read as seen:');
            console.log(seen);
            seen.push(body.id);
            await pool.hset('answers_seen', 'messages', JSON.stringify(seen), () => {
                console.log(`I added message '${body.id}' to my seen messages.`);
            });
        });
    }
    if (targetEntity === 'user')
        entity = user_entity_1.User;
    else if (targetEntity === 'question')
        entity = question_entity_1.Question;
    else
        return 'OK';
    console.log('* I am interested in it.');
    if (action === 'post') {
        const target = await manager.create(entity, object);
        const res = await manager.save(target);
        console.log(`* New ${targetEntity} with id '${res['id']}' is saved.`);
    }
    else if (action === 'delete') {
        const target = await manager.findOne(entity, { id: entryId });
        if (!target) {
            console.log(`* I did not find ${targetEntity} with id '${entryId}', never mind it was going to be deleted anyway.`);
            return 'OK';
        }
        const res = await manager.delete(entity, { id: entryId });
        console.log(`* ${targetEntity} with id '${entryId}' was deleted successfully.`);
    }
    else if (action === 'patch') {
        const target = await manager.findOne(entity, { id: entryId });
        if (!target)
            throw new common_1.NotFoundException(`${targetEntity} '${entryId}' not found.`);
        const newObject = await manager.merge(entity, target, object);
        const res = await manager.save(newObject);
        console.log(`${targetEntity} with id '${res['id']}' updated successfully.`);
    }
    return 'OK';
}
exports.handleChoreoMessage = handleChoreoMessage;
//# sourceMappingURL=methods.js.map