// src/proxy/proxy.controller.ts
import {Controller, All, Req, Res, Param, HttpStatus, UseGuards} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiService } from './api.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    // Auth 서비스로 요청 전달
    @All('auth/*')
    async authProxy(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            // 'api/auth/' 이후의 경로 추출
            const path = req.url.replace(/^\/api\/auth\//, '');

            const result = await this.apiService.forwardToAuth(
                req.method,
                path,
                req.body,
                req.headers,
                req.query,
            );

            res.status(HttpStatus.OK).json(result);
        } catch (error) {
            const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
            res.status(statusCode).json({
                statusCode,
                message: error.message || '내부 서버 오류',
                data: error.data,
            });
        }
    }

    // Event 서비스로 요청 전달

    @All('event')
    @All('event/*')
    async eventProxy(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            // 'api/event/' 이후의 경로 추출
            const path = req.url.replace('/api/event', '');

            const result = await this.apiService.forwardToEvent(
                req.method,
                path,
                req.body,
                req.headers,
                req.query,
            );

            res.status(HttpStatus.OK).json(result);
        } catch (error) {
            const statusCode = error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
            res.status(statusCode).json({
                statusCode,
                message: error.message || '내부 서버 오류',
                data: error.data,
            });
        }
    }
}