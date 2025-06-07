import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Twit, TwitDocument } from './schemas/twit.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class TwitsService {
  constructor(
    @InjectModel(Twit.name) private twitModel: Model<TwitDocument>,
    private userService: UsersService,
  ) {
  }

  async create(
    content: string,
    authorId: string,
  ): Promise<Twit | { message: string; statusCode: number }> {
    if (content.length < 1 || content.length > 280) {
      return {
        message: 'Content must be between 1 and 280 characters',
        statusCode: 400,
      };
    }
    const user = await this.userService.findOne(authorId);
    if (!user) {
      return {
        message: 'Author not found',
        statusCode: 404,
      };
    }
    const createdTwit = new this.twitModel({
      content,
      authorId,
      authorName: user.name,
    });
    await createdTwit.save();
    await this.userService.update(authorId, {
      $push: { twits: createdTwit._id },
    });

    return createdTwit.save();
  }

  async update(
    content: string,
    id: string,
  ): Promise<Twit | { message: string; statusCode: number }> {
    if (content.length < 1 || content.length > 280) {
      return {
        message: 'Content must be between 1 and 280 characters',
        statusCode: 400,
      };
    }
    const twit = await this.twitModel.findById({ _id: id }).exec();
    if (!twit) {
      return {
        message: 'Twit not found',
        statusCode: 404,
      };
    }
    twit.content = content;
    await twit.save();
    return twit;
  }

  async delete(id: string): Promise<Twit | { message: string }> {
    const twit = await this.twitModel.findByIdAndDelete(id).exec();
    if (!twit) {
      return { message: 'Twit not found' };
    }
    await this.userService.update(twit.authorId, {
      $pull: { twits: twit._id },
    });
    return twit;
  }

  async findAll(): Promise<Twit[]> {
    return this.twitModel.find().limit(10).exec();
  }

  async findByUser(userId: string): Promise<Twit[]> {
    return this.twitModel.find({ authorId: userId }).exec();
  }
  async findOne(id: string): Promise<Twit | null> {
    return this.twitModel.findById({ _id: id }).exec();
  }

  async likeTwit(
    twitId: string,
    userId: string,
  ): Promise<Twit | { message: string; statusCode: number }> {
    const twit = await this.twitModel.findById(twitId).exec();
    if (!twit) {
      return { message: 'Twit not found', statusCode: 404 };
    }
    if (twit.likes.includes(userId)) {
      twit.likes = twit.likes.filter((id) => id !== userId);
      await this.userService.update(userId, { $pull: { liked: twitId } });
    } else {
      twit.likes.push(userId);
      await this.userService.update(userId, { $push: { liked: twitId } });
    }
    await twit.save();
    return twit;
  }
}
