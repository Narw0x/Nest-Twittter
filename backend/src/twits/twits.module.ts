import { Module } from '@nestjs/common';
import { TwitsService } from './twits.service';
import { TwitsController } from './twits.controller';
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Twit, TwitSchema } from './schemas/twit.schema';
import { UsersModule } from '../users/users.module';
import { User, UserSchema } from '../users/schemas/user.schema';

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
