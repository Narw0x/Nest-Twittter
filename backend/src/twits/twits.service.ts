import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';

import { Twit, TwitDocument } from './twit.schema';
import { UsersService } from '../users/users.service';
import { UserWithTwits } from './interfaces/userWithTwits.interface';
import { TwitsWithUsers } from './interfaces/twitsWithUsers';


@Injectable()
export class TwitsService {
  constructor(
    @InjectModel(Twit.name) private twitModel: Model<TwitDocument>,
    private userService: UsersService,
  ) {}

  async create(
    content: string,
    userId: Types.ObjectId,
  ): Promise<Twit> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const createdTwit = new this.twitModel({
      content,
      userId,
    });
    await createdTwit.save();
    return createdTwit;
  }

  async update(
    content: string,
    id: Types.ObjectId,
  ): Promise<Twit> {
    const twit = await this.twitModel.findById({ _id: id }).exec();
    if (!twit) {
      throw new NotFoundException('Twit not found');
    }
    twit.content = content;
    await twit.save();
    return twit;
  }

  async delete(id: Types.ObjectId): Promise<Twit> {
    const twit = await this.twitModel.findByIdAndDelete(id).exec();
    if (!twit) {
      throw new NotFoundException('Twit not found');
    }
    return twit;
  }

  async findAll(): Promise<TwitsWithUsers[]> {
    const twits = await this.twitModel.find().limit(10).exec();

    if (!twits || twits.length === 0) {
      throw new NotFoundException('No twits found');
    }

    return Promise.all(
      twits.map(async (twit: Twit) => {
        const user = await this.userService.findOne(twit.userId);
        if (!user) {
          throw new NotFoundException(`User not found for twit`);
        }
        return {
          twit: twit,
          user: {
            email: user.email,
            name: user.name,
          },
        };
      })
    );
  }

  async findByUser(userId: Types.ObjectId): Promise<UserWithTwits> {
    const twits = await this.twitModel.find({ userId }).exec();
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!twits || twits.length === 0) {
      return {
        user,
        twits: [],
      };
    }
    return {
      user,
      twits
    }
  }
  async findOne(id: Types.ObjectId): Promise<UserWithTwits> {
    const twit = await this.twitModel.findById(id).exec();
    if (!twit) {
      throw new NotFoundException('Twit not found');
    }
    const user = await this.userService.findOne(twit.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      user,
      twits: [twit],
    };
  }

  async findAllTwits(): Promise<Twit[]> {
    const twits = await this.twitModel.find().exec();
    if (!twits || twits.length === 0) {
      throw new NotFoundException('No twits found');
    }
    return twits;
  }

  async findTwitById(id: Types.ObjectId): Promise<Twit> {
    const twit = await this.twitModel.findById(id).exec();
    if (!twit) {
      throw new NotFoundException('Twit not found');
    }
    return twit;
  }
}
