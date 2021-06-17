import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const myPort = 3008;
  const myAddress = `http://localhost:${myPort}`;
  const choreoAddress = `http://localhost:3013`;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      choreoAddress,
      'http://localhost:3009',
      'http://localhost:3010',
      'http://localhost:3011',
      'http://localhost:3012',
    ],
  });

  const REDIS_PORT = 6379;
  const REDIS_HOST = 'localhost';
  const TotalConnections = 20

  const pool = require('redis-connection-pool')('myRedisPool', {
    host: REDIS_HOST,
    port: REDIS_PORT,
    max_clients: TotalConnections,
    perform_checks: false,
    database: 0,
  });
  console.log('connected to redis');

  /* ensure that I am subscribed to the service bus channel */
  pool.hget('choreographer', 'subscribers', async (err: any, data: any) => {
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
  })
  
  await app.listen(myPort);
}
bootstrap();
