import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v7 } from 'uuid';

@Schema({
  versionKey: false, // __v 필드 자체를 비활성화
})
export class Currency extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  currency_id: string;
  @Prop({ required: true })
  currency_symbol: string;
  @Prop({ required: false })
  description: string;
  @Prop({ required: true, default: Date.now })
  created_at: Date;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
