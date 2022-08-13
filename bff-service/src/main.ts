import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const { PORT = 4000 } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.enableCors({
    origin: '*',
    methods: '*',
    credentials: true,
  });
  await app
    .listen(PORT)
    .then(() => Logger.log(`Server 🚀 started at port: ${PORT}`));
}

bootstrap();
