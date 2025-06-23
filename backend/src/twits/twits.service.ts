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
    const sendUser = {
      name: user.name,
      email: user.email,
    };

    const createdTwit = new this.twitModel({
      content,
      userId,
      user: sendUser,
    });
    await createdTwit.save();
    await this.userService.update(userId, {
      $push: { twitsId: createdTwit._id },
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
      $pull: { twitsId: twit._id },
    });
    return twit;
  }

  async findAll(): Promise<Twit[]> {
    return this.twitModel.find().limit(10).exec();
  }

  async findByUser(userId: string): Promise<Twit[]> {
    return this.twitModel.find({ userId: userId }).exec();
  }
  async findOne(id: string): Promise<Twit | null> {
    return this.twitModel.findById({ _id: id }).exec();
  }
}
