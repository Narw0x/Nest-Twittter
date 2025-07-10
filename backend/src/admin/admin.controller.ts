import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { UsersService } from '../users/users.service';
import { TwitsService } from '../twits/twits.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService, private readonly twitsService: TwitsService) {}
  @Get('users')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Get('users/:id')
  findUserById(@Param('id') id: Types.ObjectId) {
    return this.usersService.findOne(id);
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch('users/:id')
  async editUser(
    @Param('id') id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: Types.ObjectId) {
    return this.usersService.delete(id);
  }


  @Get('twits')
  findAllTwits() {
    return this.twitsService.findAllTwits();
  }
  @Get('twits/:id')
  findTwitById(@Param('id') id: Types.ObjectId) {
    return this.twitsService.findTwitById(id);
  }
  @Post('twits/create')
  async createTwit(@Body('content') content: string, @Body('userId') userId: Types.ObjectId) {
    return this.twitsService.create(content, userId);
  }
  @Patch('twits/:id/edit')
  async editTwit(
    @Param('id') id: Types.ObjectId,
    @Body('content') content: string,
  ) {
    return this.twitsService.update(content, id);
  }
  @Delete('twits/:id')
  async deleteTwit(@Param('id') id: Types.ObjectId) {
    return this.twitsService.delete(id);
  }

}
