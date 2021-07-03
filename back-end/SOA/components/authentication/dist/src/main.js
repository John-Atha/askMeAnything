"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const myPort = process.env.PORT || 8080;
    const myAddress = 'https://askmeanything-soa-authenticate.herokuapp.com';
    const ESBAddress = 'https://askmeanything-soa-esb.herokuapp.com';
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: ESBAddress,
    });
    const TotalConnections = 50;
    const pool = require('redis-connection-pool')('myRedisPool', {
        url: process.env.REDIS_URL,
        max_clients: TotalConnections,
        perform_checks: false,
        database: 0,
    });
    console.log('connected to redis');
    pool.hget('channel', 'subscribers', async (err, data) => {
        const subscribers = JSON.parse(data) || [];
        const subscribed = subscribers ? subscribers.includes(myAddress) : false;
        if (!subscribed) {
            subscribers.push(myAddress);
            pool.hset('channel', 'subscribers', JSON.stringify(subscribers), () => {
                console.log('Subscribed successfully.');
            });
        }
        else {
            console.log('Already subscribed.');
        }
    });
    await app.listen(myPort);
}
bootstrap();
//# sourceMappingURL=main.js.map