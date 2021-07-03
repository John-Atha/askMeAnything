import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      "https://askmeanything-soa-quest-man.herokuapp.com",
      "https://askmeanything-soa-authenticate.herokuapp.com",
      "https://askmeanything-soa-quest-run.herokuapp.com",
      "https://askmeanything-soa-anals-stats.herokuapp.com",
    ],
  });
  //await app.listen(3006);
  await app.listen(process.env.PORT || 8080);
  
}
bootstrap();
