import {Body, Controller, Get, Post} from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUserDto, SignInDto} from "./user.dto";
import {User} from "../schemas/user.schema";

@Controller('/user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    getHello(): string {
        return this.service.getHello();
    }

    @Post('/signUp')
    signUp(@Body() dto : CreateUserDto):Promise<User> {
        return this.service.create(dto);
    }

    @Post('/signIn')
    signIn(@Body() dto: SignInDto) {
        return this.service.signIn(dto);
    }
}
