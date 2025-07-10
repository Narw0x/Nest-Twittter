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

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check for existing user first
    await this.checkEmailExists(createUserDto.email);

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      // Create new user
      const createdUser = new this.userModel({
        ...createUserDto,
        passwordHash: hashedPassword,
      });
      // Save and return the user
      return await createdUser.save();
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
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

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Only include fields that are being updated
    const updateData: Partial<UpdateUserDto> = {
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
    };

    if (updateUserDto.name) {
      updateData.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      await this.checkEmailExists(updateUserDto.email, id);
      updateData.email = updateUserDto.email;
    }

    if (updateUserDto.password) {
      updateData.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    }

    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).exec();

      console.log(`Updated user: ${JSON.stringify(updatedUser)}`);

      if (!updatedUser) {
        throw new NotFoundException(`User with ID not found`);
      }

      // Remove sensitive data before returning
      updatedUser.passwordHash = '';
      return updatedUser;
    } catch (e) {
      if (e instanceof ConflictException) {
        throw e;
      }
      throw new InternalServerErrorException('Failed to update user');
    }
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
