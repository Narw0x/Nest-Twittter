import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { User, UserSchema } from './users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { TwitsModule } from './twits/twits.module';
import { TwitsService } from './twits/twits.service';
import { Twit, TwitSchema } from './twits/schemas/twit.schema';
import { LikesModule } from './likes/likes.module';
import { LikesService } from './likes/likes.service';
import { Like, LikeSchema } from './likes/schemas/like.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Twit.name, schema: TwitSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    JwtModule,
    TwitsModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersService,
    AuthService,
    TwitsService,
    LikesService,
  ],
})
export class AppModule {}
