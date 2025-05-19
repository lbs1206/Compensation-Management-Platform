import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v7 } from 'uuid';

@Schema({
  versionKey: false, // __v 필드 자체를 비활성화
})
export class UserItem extends Document {
  @Prop({
    required: true,
    unique: true,
    default: v7,
  })
  user_item_id: string;

  @Prop({ required: true })
  user_key: string;

  @Prop({ required: true })
  item_id: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, default: Date.now })
  created_at: Date;
}

export const UserItemSchema = SchemaFactory.createForClass(UserItem);
