import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TwitsService } from './twits.service';
import { TwitsController } from './twits.controller';
import { UsersService } from '../users/users.service';
import { Twit, TwitSchema } from './twit.schema';
import { UsersModule } from '../users/users.module';
import { User, UserSchema } from '../users/user.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Twit.name, schema: TwitSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [TwitsService, UsersService],
  controllers: [TwitsController],
})
export class TwitsModule {}
