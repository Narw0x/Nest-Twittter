import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';

import { LikesService } from './likes.service';

@Controller('likes')
@UseGuards(AuthGuard('jwt'))
export class LikesController {
  constructor(private readonly likeService: LikesService) {}
  @Post()
  likeTwit(
    @Body('twitId') twitId: Types.ObjectId,
    @Body('userId') userId: Types.ObjectId,
  ): Promise<{ message: string; statusCode: number }> {
    return this.likeService.likeTwit(twitId, userId);
  }

  @Get(':userId')
  getUserLikes(@Param('userId') userId: Types.ObjectId): Promise<Types.ObjectId[]> {
    return this.likeService.getUserLikes(userId);
  }
}
