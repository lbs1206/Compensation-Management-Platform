import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '../schemas/event.schema';
import { Model } from 'mongoose';
import {
  CreateEventDto,
  getEventListDto,
  getEventRequestPagingDto,
  getEventRewardDto,
  postEventRewardDto,
  PutEventDto,
} from './event.dto';
import { Reward } from '../schemas/reward.schema';
import { AuthApiService } from '../axios/auth-api.service';
import { EventRequest } from '../schemas/event-request.schema';
import { Currency } from '../schemas/currency.schema';
import { CurrencyWallet } from '../schemas/currency-wallet.schema';
import { RewardReceive } from '../schemas/reward-receive.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(EventRequest.name) private requestModel: Model<EventRequest>,
    @InjectModel(Reward.name) private rewardModel: Model<Reward>,
    @InjectModel(RewardReceive.name)
    private rewardReceiveModel: Model<RewardReceive>,
    @InjectModel(Currency.name) private currencyModel: Model<Currency>,
    @InjectModel(CurrencyWallet.name)
    private currencyWalletModel: Model<CurrencyWallet>,
    private auth_api_service: AuthApiService,
  ) {}

  create(dto: CreateEventDto): Promise<Event> {
    const event = new this.eventModel(dto);
    return event.save();
  }

  async update(dto: PutEventDto) {
    return await this.eventModel
      .updateOne({ event_id: dto.event_id }, dto)
      .exec();
  }

  async findAll(dto: getEventListDto) {
    const { page, limit, sort } = dto;

    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      this.eventModel.find().sort(sort).skip(skip).limit(limit).exec(),
      this.eventModel.countDocuments(),
    ]);

    return {
      data: events,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
      },
    };
  }

  creteRequest(user_key: string, event_id: string): Promise<EventRequest> {
    const request = new this.requestModel({
      user_key: user_key,
      event_id: event_id,
    });
    return request.save();
  }

  async chkRequest(user_key: string, event_id: string) {
    const count: number = await this.requestModel
      .countDocuments({
        user_key: user_key,
        event_id: event_id,
        status: 'SUCCESS',
      })
      .exec();
    return count > 0;
  }

  findOne(event_id: string): Promise<Event | null> {
    return this.eventModel.findOne({ event_id: event_id });
  }

  async eventLoginReward(
    event: Event,
    user_key: string,
    event_request_id: string,
  ) {
    const login_hist: any = await this.auth_api_service.getUserHistory(
      user_key,
      event.start_date,
      event.end_date,
    );

    console.log(JSON.stringify(login_hist));

    //실제 날짜 체크
    const uniqueLoginDays = new Set(
      login_hist.map((item: any) => item.created_at.substring(0, 10)), // YYYY-MM-DD 부분만 추출
    );
    //const check = uniqueLoginDays.size >= event.condition_value.days;
    //테스트 용
    const check = login_hist.length >= event.condition_value.days;
    if (!check) {
      return false;
    }
    //보상 지급
    const rewards: Reward[] = await this.rewardModel
      .find({ event_id: event.event_id })
      .exec();

    for (const reward of rewards) {
      if (reward.reward_type == 'CURRENCY') {
        const currency: Currency = await this.currencyModel
          .findOne({ currency_id: reward.reward_ref_id })
          .exec();

        //재화 보상 지급
        await this.receiveCurrency(
          currency.currency_id,
          currency.currency_symbol,
          reward.quantity,
          user_key,
        );
        //보상 지급 이력 저장
        const rewardReceive: any = {
          reward_id: reward.reward_id,
          event_request_id: event_request_id,
          status: 'SUCCESS',
        };
        await new this.rewardReceiveModel(rewardReceive).save();
      }
    }

    return true;
  }

  async receiveCurrency(
    currency_id: string,
    currency_symbol: string,
    balance: number,
    user_key: string,
  ) {
    const wallet: CurrencyWallet = await this.currencyWalletModel
      .findOne({ user_key: user_key, currency_id: currency_id })
      .exec();

    if (wallet) {
      wallet.balance += balance;
      await wallet.save();
    } else {
      const data: any = {
        currency_id: currency_id,
        currency_symbol: currency_symbol,
        balance: balance,
        user_key: user_key,
      };
      await new this.currencyWalletModel(data).save();
    }
  }

  createReward(dto: postEventRewardDto) {
    return new this.rewardModel(dto).save();
  }

  findRewardAll(dto: getEventRewardDto) {
    return this.rewardModel.find({ event_id: dto.event_id }).exec();
  }

  async findRequestAll(
    dto: getEventRequestPagingDto,
    filter: any,
    role: string,
    user_key: string,
  ) {
    if (role == 'USER') {
      filter.user_key = user_key;
    }
    console.log(role);
    console.log(user_key);
    console.log(JSON.stringify(filter));
    const [events, total] = await Promise.all([
      this.requestModel
        .find(filter)
        .sort(dto.sort)
        .skip(dto.getSkip())
        .limit(dto.limit)
        .exec(),
      this.requestModel.countDocuments(),
    ]);

    return {
      data: events,
      metadata: {
        total,
        page: dto.page,
        limit: dto.limit,
        totalPages: Math.ceil(total / dto.limit),
        hasNext: dto.page < Math.ceil(total / dto.limit),
      },
    };
  }

  getHello(): string {
    return 'User Hello!';
  }
}
