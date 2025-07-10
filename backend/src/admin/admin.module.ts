import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { TwitsModule } from '../twits/twits.module';

@Module({
  imports: [UsersModule, TwitsModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
