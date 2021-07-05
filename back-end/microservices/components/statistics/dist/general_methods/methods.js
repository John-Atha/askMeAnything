"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChoreoMessage = exports.monthlyCountsParseInt = exports.daysComplete = exports.verify = exports.paginate = exports.validateParams = void 0;
const common_1 = require("@nestjs/common");
const async_calls_1 = require("../async_calls/async_calls");
const answer_entity_1 = require("../src/answer/entities/answer.entity");
const choreoObject_dto_1 = require("../src/choreoObject.dto");
const keyword_entity_1 = require("../src/keyword/entities/keyword.entity");
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
const daysComplete = (data, key) => {
    let flag = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    data.forEach((obj) => {
        const day = obj.day;
        obj[key] = parseInt(obj[key]);
        const index = flag.indexOf(day);
        flag = flag.slice(0, index).concat(flag.slice(index + 1, flag.length));
    });
    flag.forEach((day) => {
        data.push({
            day: day,
            [key]: 0,
        });
    });
    return data;
};
exports.daysComplete = daysComplete;
const monthlyCountsParseInt = (data, key) => {
    return data.map((obj) => {
        return {
            month: obj.month,
            [key]: parseInt(obj[key]),
        };
    });
};
exports.monthlyCountsParseInt = monthlyCountsParseInt;
async function handleChoreoMessage(body, manager, pool, fresh) {
    const { action, object, entryId, targetEntity } = body;
    console.log(`--->>Choreographer passed me the message ${body.id}`);
    let entity = null;
    if (fresh) {
        await pool.hget('statistics_seen', 'messages', async (err, data) => {
            let seen = JSON.parse(data) || [];
            seen.push(body.id);
            await pool.hset('statistics_seen', 'messages', JSON.stringify(seen), () => {
                console.error(`I added message '${body.id}' to my seen messages.`);
            });
        });
    }
    if (targetEntity === 'user')
        entity = user_entity_1.User;
    else if (targetEntity === 'question')
        entity = question_entity_1.Question;
    else if (targetEntity === 'answer')
        entity = answer_entity_1.Answer;
    else if (targetEntity === 'keyword')
        entity = keyword_entity_1.Keyword;
    else if (targetEntity === 'question-keywords') {
        if (action !== 'patch')
            return 'OK';
        console.log('* I am interested in it.');
        console.log(entryId);
        const question = await manager.findOne(question_entity_1.Question, { id: entryId });
        if (!question)
            throw new common_1.NotFoundException(`Question '${entryId}' not found.`);
        console.log(object);
        question.keywords = object;
        const res = await manager.save(question);
        console.log(`Keywords of question '${entryId}' were updated.`);
        return 'OK';
    }
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
        console.log(`* ${targetEntity} with id '${res['id']}' updated successfully.`);
    }
    return 'OK';
}
exports.handleChoreoMessage = handleChoreoMessage;
//# sourceMappingURL=methods.js.map