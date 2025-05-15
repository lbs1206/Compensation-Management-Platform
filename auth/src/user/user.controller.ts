import {Body, Controller, Get, Post} from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUserDto} from "./user.dto";

@Controller('/user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    getHello(): string {
        return this.service.getHello();
    }

    @Post('/signUp')
    signUp(@Body() dto : CreateUserDto) {
        return this.service.create(dto);
    }

    @Post('/signIn')
    signIn(): string {
        return this.service.getHello();
    }
}
