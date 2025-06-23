import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './schemas/like.schema';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
