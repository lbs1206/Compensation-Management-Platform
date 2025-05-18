import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v7 } from 'uuid';

@Schema({
  versionKey: false, // __v 필드 자체를 비활성화
})
export class RewardReceive extends Document {
  @Prop({
    required: true,
    unique: true,
    default: v7,
  })
  reward_receive_id: string;
  @Prop({ required: true })
  event_request_id: string;
  @Prop({ required: true })
  reward_id: string;
  @Prop({ required: true })
  status: string;
  created_at: Date;
}

export const RewardReceiveSchema = SchemaFactory.createForClass(RewardReceive);
