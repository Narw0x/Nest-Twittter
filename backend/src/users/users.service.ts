import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    createUserDto: createUserDto,
  ): Promise<User | { message: string; statusCode: number }> {
    // Check if the user already exists
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
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    const foundUser = await this.userModel.findOne({ _id: id });
    if (!foundUser) {
      return null;
    }
    foundUser.passwordHash = '';
    return foundUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: updateUserDto | UpdateQuery<User>) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
