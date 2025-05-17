import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import { createProxyMiddleware } from 'http-proxy-middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,          // DTO에 정의되지 않은 속성은 제거
    transform: true,          // 데이터 타입을 자동으로 변환
  }));

  // Proxy /api/auth requests to http://localhost:3010
  app.use(
      '/api/auth',
      createProxyMiddleware({
        target: 'http://localhost:3010',
        changeOrigin: true,
      }),
  );

  // Proxy /api/event requests to http://localhost:3020
  app.use(
      '/api/event',
      createProxyMiddleware({
        target: 'http://localhost:3020',
        changeOrigin: true,
      }),
  );



  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
