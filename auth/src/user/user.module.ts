import { Module } from '@nestjs/common';
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {Utils} from "../common/utils";


@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, Utils],
})
export class UserModule {}
