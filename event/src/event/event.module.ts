import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { AxiosModule } from '../axios/axios.module';

@Module({
  imports: [AxiosModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
