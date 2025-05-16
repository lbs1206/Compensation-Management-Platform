import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Event} from "../schemas/event.schema";
import {Model} from "mongoose";
import {CreateEventDto, getEventListDto} from "./event.dto";


@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private eventModel: Model<Event>,
    ) {}


    async create(dto: CreateEventDto) : Promise<Event> {
        const event = new this.eventModel(dto);
        return event.save();
    }

    async findAll(dto: getEventListDto) {
        const { page, limit , sort  } =new getEventListDto();

        const skip = (page - 1) * limit;

        const [events, total] = await Promise.all([
            this.eventModel.find()
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .exec(),
            this.eventModel.countDocuments()
        ]);

        return {
            data: events,
            metadata: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNext: page < Math.ceil(total / limit)
            }
        };

    }

    async findOne(event_id: string) {
        return this.eventModel.findById(event_id);
    }

    getHello(): string {
        return 'User Hello!';
    }
}
