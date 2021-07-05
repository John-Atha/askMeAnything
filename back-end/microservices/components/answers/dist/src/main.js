"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalConnections = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const myPort = process.env.PORT || 8080;
const myAddress = 'https://askmeanything-micro-answers.herokuapp.com';
exports.TotalConnections = 50;
const choreoAddress = 'https://askmeanything-micro-choreo.herokuapp.com';
async function bootstrap() {
    const pool = require('redis-connection-pool')('myRedisPool', {
        url: process.env.REDIS_URL,
        max_clients: exports.TotalConnections,
        perform_checks: false,
        database: 0,
    });
    console.log('connected to redis');
    pool.hget('choreographer', 'subscribers', async (err, data) => {
        const subscribers = JSON.parse(data) || [];
        const subscribed = subscribers ? subscribers.includes(myAddress) : false;
        if (!subscribed) {
            subscribers.push(myAddress);
            pool.hset('choreographer', 'subscribers', JSON.stringify(subscribers), () => {
                console.log('Subscribed successfully.');
            });
        }
        else {
            console.log('Already subscribed.');
        }
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: [
            'https://askmeanything52.herokuapp.com',
            choreoAddress,
            'https://askmeanything-micro-auth.herokuapp.com',
            'https://askmeanything-micro-questions.herokuapp.com',
            'https://askmeanything-micro-statistics.herokuapp.com',
            'https://askmeanything-micro-analytics.herokuapp.com',
        ],
    });
    await app.listen(myPort);
}
bootstrap();
//# sourceMappingURL=main.js.map