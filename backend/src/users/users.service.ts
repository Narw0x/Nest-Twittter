import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types, UpdateQuery } from 'mongoose';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { message: string; statusCode: number }> {
    // Check if the user already exists
    console.log(createUserDto);

    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      return {
        message: 'User with this email already exists',
        statusCode: 400,
      };
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      passwordHash: hashedPassword,
    });
    const response = await createdUser.save();
    return response;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: Types.ObjectId): Promise<User | null> {
    const foundUser = await this.userModel.findOne({ _id: id });
    if (!foundUser) {
      throw new NotFoundException(`User was not found`);
    }
    return {
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      passwordHash: '',
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    await this.checkEmailExists(email);
    return this.userModel.findOne({ email }).exec();
  }

  async update(
    id: Types.ObjectId,
    updateUserDto: UpdateUserDto | UpdateQuery<User>,
  ) {

    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unused-vars
    const {password, ...updateDataWithoutPassword} = updateUserDto;

    const updateData = {
    ...updateDataWithoutPassword,
      passwordHash: hashedPassword,
    }

    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: Types.ObjectId): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  private async checkEmailExists(email: string, id: Types.ObjectId | null = null): Promise<void> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser && (!id || existingUser._id.toString() !== id.toString())) {
      throw new ConflictException('User with this email already exists');
    }
  }
}
