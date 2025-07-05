import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TwitsService } from './twits.service';
import { CreateTwitDto } from './dto/create-twit.dto';
import { Twit } from './twit.schema';
import { Types } from 'mongoose';
import { UserWithTwits } from './interfaces/userWithTwits.interface';
import { TwitsWithUsers } from './interfaces/twitsWithUsers';


@Controller('twits')
@UseGuards(AuthGuard('jwt'))
export class TwitsController {
  constructor(private readonly twitsService: TwitsService) {}
  @Get()
  findAll(): Promise<TwitsWithUsers[]> {
    return this.twitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId): Promise<UserWithTwits> {
    return this.twitsService.findOne(id);
  }
  @Get('user/:userId')
  findByUser(@Param('userId') userId: Types.ObjectId): Promise<UserWithTwits> {
    return this.twitsService.findByUser(userId);
  }
  @Post('create')
  async create(
    @Body() createTwitDto: CreateTwitDto,
  ): Promise<Twit> {
    return await this.twitsService.create(
      createTwitDto.content,
      createTwitDto.userId,
    );
  }
  @Put(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body('content') content: string,
  ): Promise<Twit> {
    return this.twitsService.update(content, id);
  }
  @Delete(':id')
  delete(@Param('id') id: Types.ObjectId): Promise<Twit> {
    return this.twitsService.delete(id);
  }
}
