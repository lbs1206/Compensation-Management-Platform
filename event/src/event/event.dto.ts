import { Prop } from '@nestjs/mongoose';
import {
  IsDate,
  IsIn,
  IsInt,
  IsJSON,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  condition_type: string;

  @IsObject()
  condition_value: Record<string, any>;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  start_date: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  end_date: Date;
}

export class PutEventDto extends CreateEventDto {
  @IsString()
  event_id: string;
  @IsOptional()
  @IsIn(['Active', 'Inactive'])
  status: string;
}

export class getEventListDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  sort?: string = '-created_at';
}

export class getEventDto {
  @IsString()
  event_id: string;
}

export class postEventRewardDto {
  @IsString()
  event_id: string;

  @IsString()
  reward_type: string;

  @IsString()
  reward_ref_id: string;

  @IsInt()
  quantity: number;
}

export class getEventRewardDto {
  @IsString()
  event_id: string;
}

export class postEventRewardReceiveDto {
  @IsUUID()
  event_id: string;

  @IsOptional()
  @IsString()
  coupon_code?: string;
}

export class getEventRewardReceiveDto {
  @IsString()
  event_id: string;
}

export class getPagingDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  sort?: string = '-created_at';

  getSkip(): number {
    return (this.page - 1) * this.limit;
  }
}

export class getEventRequestPagingDto extends getPagingDto {
  @IsOptional()
  event_id?: string;

  @IsOptional()
  status?: string;
}
