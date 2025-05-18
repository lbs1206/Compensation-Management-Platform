import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as MongooseSchema} from 'mongoose';
import { v7  } from 'uuid';



@Schema({
    versionKey: false  // __v 필드 자체를 비활성화
})
export class Reward extends Document {

    @Prop({
        required: true,
        unique: true,
        default: v7
    })
    reward_id: string;

    @Prop({
        required: true,
        ref: 'Event'
    })
    event_id: string;

    @Prop({ required: true })
    reward_type: string;

    @Prop({ required: true })
    reward_ref_id: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true , default: Date.now})
    created_at: Date;

}

export const RewardSchema = SchemaFactory.createForClass(Reward);




