import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/user.schema";
import {Model} from "mongoose";
import {CreateUserDto, SignInDto} from "./user.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {Utils} from "../common/utils";


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
                private jwtService: JwtService,
                private utils:Utils
    ) {}

    async create(dto: CreateUserDto): Promise<User> {
        dto.password = await this.utils.hash(dto.password);
        const createdUser = new this.userModel(dto);
        return createdUser.save();
    }

    async signIn(dto: SignInDto) {
        const user = await this.userModel.findOne({ username: dto.username });

        if (!user) {
            throw new UnauthorizedException('ID or password is incorrect.');
        }

        const isPasswordValid = await this.utils.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('ID or password is incorrect.');
        }

        const payload = { sub: user._id, key: user.userKey,role: user.role };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }



    getHello(): string {
        return 'User Hello!';
    }
}
