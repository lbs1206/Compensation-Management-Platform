import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  versionKey: false, // __v 필드 자체를 비활성화
})
export class CurrencyWallet extends Document {
  @Prop({
    required: true,
  })
  user_key: string;
  @Prop({
    required: true,
  })
  currency_id: string;
  @Prop({ required: true })
  currency_symbol: string;
  @Prop({ required: true, default: 0 })
  balance: number;
  @Prop({ required: true, default: Date.now })
  created_at: Date;
}

export const CurrencyWalletSchema =
  SchemaFactory.createForClass(CurrencyWallet);

CurrencyWalletSchema.index({ user_key: 1, currency_id: 1 }, { unique: true }); //복합키
