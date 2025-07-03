import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Twit, TwitDocument } from './schemas/twit.schema';
import { UsersService } from '../users/users.service';

interface TwitWithUser extends Omit<Twit, keyof Document> {
  user?: { email: string; name: string } | null;
}

@Injectable()
export class TwitsService {
  constructor(
    @InjectModel(Twit.name) private twitModel: Model<TwitDocument>,
    private userService: UsersService,
  ) {}

  async create(
    content: string,
    userId: string,
  ): Promise<Twit | { message: string; statusCode: number }> {
    if (content.length < 1 || content.length > 280) {
      return {
        message: 'Content must be between 1 and 280 characters',
        statusCode: 400,
      };
    }
    const user = await this.userService.findOne(userId);
    if (!user) {
      return {
        message: 'Author not found',
        statusCode: 404,
      };
    }

    const createdTwit = new this.twitModel({
      content,
      userId,
    });
    await createdTwit.save();
    await this.userService.update(userId, {
      $push: { twitIds: createdTwit._id },
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
    await this.userService.update(twit.userId, {
      $pull: { twitIds: twit._id },
    });
    return twit;
  }

  async findAll(): Promise<Twit[]> {
    const twits = await this.twitModel.find().limit(10).exec();
    if (!twits || twits.length === 0) {
      return [];
    }
    return await Promise.all(
      twits.map(async (twit) => {
        const user = await this.userService.findOne(twit.userId);
        return {
          ...twit.toObject(),
          user: user ? { email: user.email, name: user.name } : null,
        };
      }),
    );
  }

  async findByUser(userId: string): Promise<Twit[]> {
    const twits = await this.twitModel.find({ userId }).exec();
    if (!twits || twits.length === 0) {
      return [];
    }
    return await Promise.all(
      twits.map(async (twit) => {
        const user = await this.userService.findOne(twit.userId);
        return {
          ...twit.toObject(),
          user: user ? { email: user.email, name: user.name } : null,
        };
      }),
    );
  }
  async findOne(id: string): Promise<TwitWithUser | null> {
    const twit = await this.twitModel.findById(id).exec();
    if (!twit) {
      return null;
    }
    const user = await this.userService.findOne(twit.userId);
    return {
      ...twit.toObject(),
      user: user ? { email: user.email, name: user.name } : null,
    };
  }
}
