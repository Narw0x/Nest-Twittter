import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LikesService } from './likes.service';

@Controller('likes')
@UseGuards(AuthGuard('jwt'))
export class LikesController {
  constructor(private readonly likeService: LikesService) {}
  @Post()
  likeTwit(
    @Body('twitId') twitId: string,
    @Body('userId') userId: string,
  ): Promise<{ message: string; statusCode: number }> {
    return this.likeService.likeTwit(twitId, userId);
  }

  @Get(':userId')
  getUserLikes(@Param('userId') userId: string): Promise<string[]> {
    return this.likeService.getUserLikes(userId);
  }
}
