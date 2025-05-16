import {Global, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../schemas/event.schema';
@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Event.name, schema: EventSchema },
        ]),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
