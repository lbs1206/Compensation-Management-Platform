import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v7 } from 'uuid';

@Schema({
  versionKey: false, // __v 필드 자체를 비활성화
})
export class EventRequest extends Document {
  @Prop({
    required: true,
    unique: true,
    default: v7,
  })
  event_request_id: string;
  @Prop({ required: true })
  user_key: string;
  @Prop({ required: true })
  event_id: string;

  @Prop({ required: true, default: 'Pending' })
  staus: string;

  @Prop({ required: true, default: Date.now })
  requested_at: Date;
  @Prop({ required: false })
  processed_at: Date;
  @Prop({ required: false })
  fail_reason: string;
  @Prop({ required: true, default: Date.now })
  created_at: Date;
}

export const EventRequestSchema = SchemaFactory.createForClass(EventRequest);
