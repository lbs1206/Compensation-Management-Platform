// src/auth/guards/jwt-auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { PUBLIC_ROUTES } from './constants';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Public 데코레이터가 있는 경우 인증 건너뛰기(gateway 서버에서 사용)
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        // Public 경로 확인 (프록시 엔드포인트에 맞게 확인)
        const request = context.switchToHttp().getRequest();
        const { path, method } = request;

        const isPublicRoute = PUBLIC_ROUTES.some(
            route => path.includes(route.path) && method === route.method
        );

        if (isPublicRoute) {
            return true;
        }

        // JWT 인증 진행
        return super.canActivate(context);
    }
}