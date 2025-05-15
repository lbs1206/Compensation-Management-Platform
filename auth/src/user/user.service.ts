import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/user.schema";
import {Model} from "mongoose";
import {CreateUserDto} from "./user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(dto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(dto);
        return createdUser.save();
    }


    getHello(): string {
        return 'User Hello!';
    }
}
