import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, firstValueFrom, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  // Auth 서비스로 요청 전달
  async forwardToAuth(
    method: string,
    path: string,
    body?: any,
    headers?: any,
    query?: any,
  ): Promise<any> {
    const auth_service_url =
      this.configService.get<string>('AUTH_SERVICE_URL') ||
      'http://localhost:3010';
    const url = `${auth_service_url}/${path}`;
    return this.forwardRequest(method, url, body, headers, query);
  }

  // Event 서비스로 요청 전달
  async forwardToEvent(
    method: string,
    path: string,
    body?: any,
    headers?: any,
    query?: any,
    user?: any,
  ): Promise<any> {
    const event_service_url =
      this.configService.get<string>('EVENT_SERVICE_URL') ||
      'http://localhost:3020';
    const url = `${event_service_url}/${path}`;
    return this.forwardRequest(method, url, body, headers, query, user);
  }

  // 공통 요청 처리 함수
  private async forwardRequest(
    method: string,
    url: string,
    body?: any,
    headers?: any,
    query?: any,
    user?: any,
  ): Promise<any> {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user ? user.user_id : '',
          'x-user-role': user ? user.role : '',
          'x-user-key': user ? user.user_key : '',
        },
        params: query,
      };

      console.log(JSON.stringify(config.headers));

      let request: Observable<AxiosResponse<any>>;

      switch (method.toLowerCase()) {
        case 'get':
          request = this.httpService.get(url, config);
          break;
        case 'post':
          request = this.httpService.post(url, body, config);
          break;
        case 'put':
          request = this.httpService.put(url, body, config);
          break;
        case 'delete':
          request = this.httpService.delete(url, config);
          break;
        case 'patch':
          request = this.httpService.patch(url, body, config);
          break;
        default:
          throw new Error(`지원하지 않는 HTTP 메서드: ${method}`);
      }

      const response = await firstValueFrom(
        request.pipe(
          map((response) => response.data),
          catchError((error) => {
            console.error(`API 호출 중 오류 발생:`, error.message);
            if (error.response) {
              console.error('서버 응답:', error.response.data);
              return throwError(() => ({
                statusCode: error.response.status,
                message: error.response.data.message || '서버 오류',
                data: error.response.data,
              }));
            }
            return throwError(() => ({
              statusCode: 500,
              message: '서버에 연결할 수 없습니다. 네트워크 연결을 확인하세요.',
            }));
          }),
        ),
      );

      return response;
    } catch (error) {
      console.error(`요청 실패: ${url}`, error);
      throw error;
    }
  }
}
