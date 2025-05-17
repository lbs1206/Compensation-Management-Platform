import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {ConfigService} from "@nestjs/config";

//JWT 전략?
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Bearer 방식
            ignoreExpiration: false, //만료 무시
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    //auth-service 에서 넣은 payload
    async validate(payload: any) {
        return {
            userId: payload.sub,
            userKey: payload.key,
            role: payload.role
        };
    }
}