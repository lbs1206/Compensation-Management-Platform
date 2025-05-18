import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const generateUserKey = (): string => {
  const timestamp: string = Date.now().toString(15).padStart(10, '0'); //15진수 10자리
  const randomStr: string = Math.random().toString(15).substring(2, 7); //15진수 소수점 제외 5자리

  return ('maple' + timestamp.padStart(10, '0') + randomStr).toUpperCase();
};

@Schema({
  versionKey: false, // __v 필드 자체를 비활성화
})
export class LoginHist extends Document {
  @Prop({
    required: true,
  })
  user_key: string;

  @Prop({
    required: true,
  })
  access_token: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const LoginHistSchema = SchemaFactory.createForClass(LoginHist);
