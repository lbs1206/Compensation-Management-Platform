// event-server/src/auth/auth-api.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthApiService {
  private readonly authServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // 환경 변수에서 Auth Server URL 가져오기
    this.authServiceUrl =
      this.configService.get<string>('AUTH_SERVICE_URL') ||
      'http://localhost:3010';
  }

  async getUserHistory(user_key: string, start_date: Date, end_date: Date) {
    try {
      // Axios 요청 보내기

      console.log(
        `${
          this.authServiceUrl
        }/user/hist?user_key=${user_key}&start_date=${start_date.toISOString()}&end_date=${end_date.toISOString()}`,
      );
      const response = await lastValueFrom(
        this.httpService.get(
          `${
            this.authServiceUrl
          }/user/hist?user_key=${user_key}&start_date=${start_date.toISOString()}&end_date=${end_date.toISOString()}`,
        ),
      );

      return response.data;
    } catch (error) {
      // 에러 처리 및 로깅
      if (error.response) {
        // 서버 응답이 있는 경우 (예: 4xx, 5xx 상태 코드)
        console.log(
          `Auth API 에러 [${error.response.status}]:`,
          error.response.data,
        );
        throw new Error(`Auth API 응답 오류: ${error.response.status}`);
      } else if (error.request) {
        // 요청은 보냈지만 응답이 없는 경우
        console.log('Auth API 타임아웃 또는 서버 접근 불가:', error.request);
        throw new Error('Auth 서버와 통신할 수 없습니다');
      } else {
        // 요청 설정 중 오류 발생
        console.log('Auth API 요청 설정 오류:', error.message);
        throw new Error(`요청 오류: ${error.message}`);
      }
    }
  }
}
