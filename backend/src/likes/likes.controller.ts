import { Body, Controller, Post } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}
  @Post()
  likeTwit(
    @Body('twitId') twitId: string,
    @Body('userId') userId: string,
  ): Promise<{ message: string; statusCode: number }> {
    return this.likeService.likeTwit(twitId, userId);
  }
}
