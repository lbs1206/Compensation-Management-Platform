import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import {DatabaseModule} from "./mongo/mongo.module";
import { JwtModule } from '@nestjs/jwt';
import {EventModule} from "./event/event.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        console.log('JWT_SECRET:', secret); // 디버깅용
        return {
          secret: secret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
      EventModule,
      DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
