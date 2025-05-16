import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as MongooseSchema} from 'mongoose';
import {Utils} from '../common/utils'

const utils = new Utils();

@Schema({
    versionKey: false  // __v 필드 자체를 비활성화
})
export class Event extends Document {
    @Prop({
        required: true,
        unique: true,
        default: utils.generateUUID()
    })
    event_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    condition_type: string;

    @Prop({
        type: MongooseSchema.Types.Mixed,
        required: true,
        // mongoose가 깊은 변경사항을 감지할 수 있도록 설정
        _id: false
    })
    condition_value: Record<string, any>;

    @Prop({ required: true })
    start_date: Date;

    @Prop({ required: true })
    end_date: Date;

    @Prop({ required: true , default: 'Inactive'})
    status: 'Active' | 'Inactive';

    @Prop({ required: true , default: Date.now})
    created_at: Date;

    @Prop({ required: true , default: Date.now})
    updated_at: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);

// pre save 미들웨어 추가
EventSchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updated_at = new Date();
    }
    next();
});




