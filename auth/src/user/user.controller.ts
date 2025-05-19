import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateAdminUserDto,
  CreateUserDto,
  GetLoginHistDto,
  getUsersDto,
  putUserRoleDto,
  SignInDto,
} from './user.dto';
import { User } from '../schemas/user.schema';

@Controller('/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }

  @Post('/signUp')
  signUp(@Body() dto: CreateUserDto): Promise<User> {
    return this.service.create(dto);
  }

  @Post('/signIn')
  signIn(@Body() dto: SignInDto) {
    return this.service.signIn(dto);
  }

  @Post('/admin/signUp')
  adminSignUp(@Body() dto: CreateAdminUserDto): Promise<User> {
    return this.service.createAdmin(dto);
  }

  @Get('/list')
  getAdminUser(@Query() dto: getUsersDto): Promise<any> {
    return this.service.findUsers(dto);
  }

  @Put('/role')
  updateRole(@Body() dto: putUserRoleDto) {
    return this.service.updateRole(dto);
  }

  @Get('/hist')
  loginHist(@Query() dto: GetLoginHistDto) {
    console.log(JSON.stringify(dto));
    return this.service.findLoginHist(dto);
  }
}
