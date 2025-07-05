import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.schema';
import { UserLogin } from './interfaces/userLogin.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('User does not match');
    }
    return user;
  }

  login(user: User): UserLogin {
    const payload = { email: user.email, sub: user._id };
    const returnUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: returnUser,
    };
  }
}
