"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthlyCountsParseInt = exports.daysComplete = exports.verify = exports.paginate = exports.validateParams = void 0;
const common_1 = require("@nestjs/common");
const async_calls_1 = require("../async_calls/async_calls");
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
    async_calls_1.isLogged(token)
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
//# sourceMappingURL=methods.js.map