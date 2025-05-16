import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateEventDto, getEventDto, getEventListDto} from "./event.dto";
import {EventService} from "./event.service";
import {Event} from "../schemas/event.schema";

@Controller('/event')
export class EventController {
    constructor(private readonly service: EventService) {}

    @Get('/hello')
    getHello(): string {
        return this.service.getHello();
    }

    @Post()
    postEvent(@Body() dto : CreateEventDto):Promise<Event> {
        return this.service.create(dto);
    }

    @Get()
    getEventList(@Body() dto: getEventListDto) {
        return this.service.findAll(dto);
    }

    @Get('/:event_id')
    getEvent(@Body() dto: getEventDto) {
        return this.service.findOne(dto.event_id);
    }

}
