import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import {
  CreateAdminUserDto,
  CreateUserDto,
  GetLoginHistDto,
  SignInDto,
} from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Utils } from '../common/utils';
import { LoginHist } from '../schemas/login-hist.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(LoginHist.name) private loginHistModel: Model<LoginHist>,
    private jwtService: JwtService,
    private utils: Utils,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    dto.password = await this.utils.hash(dto.password);

    const data: any = {
      role: 'USER',
      password: dto.password,
      username: dto.username,
    };
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async createAdmin(dto: CreateAdminUserDto): Promise<User> {
    dto.password = await this.utils.hash(dto.password);
    const createdUser = new this.userModel(dto);
    return createdUser.save();
  }

  async signIn(dto: SignInDto) {
    const user = await this.userModel.findOne({ username: dto.username });

    if (!user) {
      throw new UnauthorizedException('ID or password is incorrect.');
    }

    const isPasswordValid = await this.utils.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('ID or password is incorrect.');
    }

    //jwt access_token 생성
    const payload = { sub: user._id, key: user.user_key, role: user.role };
    const access_token: string = await this.jwtService.signAsync(payload);

    //로그인 히스토리 생성
    const hist: any = {
      user_key: user.user_key,
      access_token: access_token,
    };
    await new this.loginHistModel(hist).save();

    return {
      access_token: access_token,
    };
  }

  async findLoginHist(dto: GetLoginHistDto) {
    return this.loginHistModel.find({
      user_key: dto.user_key,
      created_at: { $gte: dto.start_date, $lte: dto.end_date },
    });
  }

  getHello(): string {
    return 'User Hello!';
  }
}
