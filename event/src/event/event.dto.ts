import {Prop} from "@nestjs/mongoose";
import {IsDate, IsInt, IsJSON, IsObject, IsOptional, IsString, Max, Min} from "class-validator";
import {Transform, Type} from "class-transformer";


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