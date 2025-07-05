import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Like } from './like.schema';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async likeTwit(
    twitId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<{ message: string; statusCode: number }> {
    const isLiked = await this.likeModel.exists({ twitId, userId });
    if (isLiked) {
      await this.likeModel.findOneAndDelete({ twitId, userId }).exec();
      return { message: 'Like removed', statusCode: 200 };
    } else {
      const newLike = new this.likeModel({ twitId, userId });
      await newLike.save();
      return { message: 'Twit liked', statusCode: 201 };
    }
  }

  async getUserLikes(userId: Types.ObjectId): Promise<Types.ObjectId[]> {
    const likes = await this.likeModel.find({ userId }).exec();
    return likes.map((like) => like.twitId);
  }
}
