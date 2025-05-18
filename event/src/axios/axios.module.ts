import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthApiService } from './auth-api.service';

@Module({
  imports: [
    HttpModule, // HttpService를 제공하는 HttpModule 임포트
    ConfigModule, // ConfigService를 제공하는 ConfigModule 임포트
  ],
  providers: [AuthApiService],
  exports: [AuthApiService], // 다른 모듈에서 사용할 수 있도록 내보내기
})
export class AxiosModule {}
