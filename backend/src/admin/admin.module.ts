import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { TwitsModule } from '../twits/twits.module';
import { User, UserSchema } from '../users/user.schema';

@Module({
  imports: [UsersModule, TwitsModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
