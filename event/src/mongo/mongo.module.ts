import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../schemas/event.schema';
import { Reward, RewardSchema } from '../schemas/reward.schema';
import {
  EventRequest,
  EventRequestSchema,
} from '../schemas/event-request.schema';
import {
  RewardReceive,
  RewardReceiveSchema,
} from '../schemas/reward-receive.schema';
import { Currency, CurrencySchema } from '../schemas/currency.schema';
import {
  CurrencyWallet,
  CurrencyWalletSchema,
} from '../schemas/currency-wallet.schema';
import { Item, ItemSchema } from '../schemas/item.schema';
import { UserItem, UserItemSchema } from '../schemas/user-item.schema';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: EventRequest.name, schema: EventRequestSchema },
      { name: RewardReceive.name, schema: RewardReceiveSchema },
      { name: Currency.name, schema: CurrencySchema },
      { name: CurrencyWallet.name, schema: CurrencyWalletSchema },
      { name: Item.name, schema: ItemSchema },
      { name: UserItem.name, schema: UserItemSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
