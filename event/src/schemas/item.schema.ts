import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v7 } from 'uuid';

@Schema({
  versionKey: false, // __v 필드 자체를 비활성화
})
export class Item extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  item_id: string;

  @Prop({ required: true, unique: true })
  item_name: string;

  @Prop({ required: false })
  description: string;
  @Prop({ required: true })
  item_type: string;
  @Prop({ required: true, default: 1 })
  max_quantity: number;
  @Prop({ required: true, default: false })
  trade_able: boolean;
  @Prop({ required: true, default: Date.now })
  created_at: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
