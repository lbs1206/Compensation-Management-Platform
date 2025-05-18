import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

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
  validate(payload: any): JwtPayload {
    return {
      user_id: payload.sub,
      user_key: payload.key,
      role: payload.role,
    };
  }
}

export interface JwtPayload {
  user_id: string;
  user_key: string;
  role: string;
}
