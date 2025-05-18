// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import {Role, PRIVATE_ROUTES,PUBLIC_ROUTES} from './constants';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {

        // Private 경로 확인 (프록시 엔드포인트에 맞게 확인)
        const request = context.switchToHttp().getRequest();
        const { path, method } = request;

        const isPublicRoute = PUBLIC_ROUTES.some(
            route => path.includes(route.path) && method === route.method
        );

        if (isPublicRoute) {
            return true;
        }

        // 요청 경로에 설정된 역할 확인
        const { user } = context.switchToHttp().getRequest();

        // 인증되지 않은 사용자는 거부 (JwtAuthGuard가 이미 처리해야 함)
        if (!user) {
            return false;
        }

        // ADMIN은 모든 권한 가짐
        if (user.role === Role.ADMIN) {
            return true;
        }

        return PRIVATE_ROUTES.some(
            route => pathCheck(path,route.path) && method === route.method && route.Role.includes(user.role)
        )
    }

}

const pathCheck = (path: string,routePath: string):boolean =>{
    if(path.includes(routePath)){
        return true;
    }

    const path_array : string[] = path.split('/');
    const route_array : string[] = routePath.split('/');

    if(path_array.length !== route_array.length){
        return false;
    }

    let check:boolean = true;
    for(let i =0; i < path_array.length; i ++){
        if(route_array[i].includes(':') && path_array[i]){
            continue;
        }
        if(route_array[i] !== path_array[i]){
            check = false;
            break;
        }
    }

    return check;
}