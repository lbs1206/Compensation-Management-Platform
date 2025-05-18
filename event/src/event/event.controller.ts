import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  NotFoundException,
  BadRequestException,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import {
  CreateEventDto,
  getEventDto,
  getEventListDto,
  getEventRequestPagingDto,
  getEventRewardDto,
  getEventRewardReceiveDto,
  getPagingDto,
  postEventRewardDto,
  postEventRewardReceiveDto,
  PutEventDto,
} from './event.dto';
import { EventService } from './event.service';
import { Event } from '../schemas/event.schema';

@Controller()
export class EventController {
  constructor(private readonly service: EventService) {}

  @Get('/hello')
  getHello(): string {
    return this.service.getHello();
  }

  @Post()
  postEvent(
    @Headers() headers: Headers,
    @Body() dto: CreateEventDto,
  ): Promise<Event> {
    console.log(headers);
    return this.service.create(dto);
  }

  @Get()
  async getEventList(@Param() dto: getEventListDto) {
    return await this.service.findAll(dto);
  }

  @Get('/detail/:event_id')
  getEvent(@Param() dto: getEventDto) {
    return this.service.findOne(dto.event_id);
  }

  @Put('/detail/:event_id')
  async putEvent(@Body() dto: PutEventDto) {
    return await this.service.update(dto);
  }

  @Post('/reward/:event_id')
  postEventReward(@Body() dto: postEventRewardDto) {
    return this.service.createReward(dto);
  }

  @Get('/reward/:event_id')
  getEventReward(@Param() dto: getEventRewardDto) {
    return this.service.findRewardAll(dto);
  }

  //보상 요청
  @Post('/request/:event_id')
  async postEventRewardReceive(
    @Headers() headers: Headers,
    @Body() dto: postEventRewardReceiveDto,
  ) {
    //요청
    console.log('보상 요청 start');
    const user_key: string = headers['x-user-key'];

    const request = await this.service.creteRequest(user_key, dto.event_id);
    //event 조회
    const event = await this.service.findOne(dto.event_id);

    if (!event) {
      return new NotFoundException();
    }

    console.log(event.status);
    if (event.status == 'Inactive') {
      return new BadRequestException();
    }

    console.log(user_key);
    console.log(dto.event_id);
    const user_request = await this.service.chkRequest(user_key, dto.event_id);
    if (user_request) {
      return new BadRequestException();
    }
    //event type에 따른 조건 체크
    let reward: boolean = false;

    if (event.condition_type == 'login') {
      reward = await this.service.eventLoginReward(
        event,
        headers['x-user-key'],
        request.event_request_id,
      );
    }

    request.staus = reward ? 'SUCCESS' : 'FAIL';
    await request.save();

    return request.staus;
  }

  //보상 요청 내역 확인
  @Get('/request')
  async getEventRewardReceive(
    @Headers() headers: Headers,
    @Query() dto: getEventRequestPagingDto,
  ) {
    const role: string = headers['x-user-role'];
    const user_key: string = headers['x-user-key'];
    const filter: any = {};
    if (dto.event_id) filter.event_id = dto.event_id;
    if (dto.status) filter.status = dto.status;
    return await this.service.findRequestAll(dto, filter, role, user_key);
  }
}
