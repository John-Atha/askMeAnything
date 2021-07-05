import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

const myPort = process.env.PORT || 8080;
const myAddress = 'https://askmeanything-micro-statistics.herokuapp.com';
const choreoAddress = 'https://askmeanything-micro-choreo.herokuapp.com';

export const TotalConnections = 50;

async function bootstrap() {

  const pool = require('redis-connection-pool')('myRedisPool', {
    url: process.env.REDIS_URL,
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
  });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'https://askmeanything52.herokuapp.com',
      choreoAddress,
      'https://askmeanything-micro-auth.herokuapp.com',
      'https://askmeanything-micro-questions.herokuapp.com',
      'https://askmeanything-micro-answers.herokuapp.com',
      'https://askmeanything-micro-analytics.herokuapp.com',
    ],
  });
  
  await app.listen(myPort);
}
bootstrap();
