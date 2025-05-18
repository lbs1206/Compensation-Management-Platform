import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { LoginHist, LoginHistSchema } from '../schemas/login-hist.schema';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: LoginHist.name, schema: LoginHistSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
