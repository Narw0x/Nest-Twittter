import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import IUser from '../users/interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return user;
    }
    return null;
  }

  login(user: IUser) {
    const payload = { email: user.email, sub: user._id };
    const returnUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      twitIds: user.twitIds || [],
    };
    return {
      access_token: this.jwtService.sign(payload),
      returnUser,
    };
  }
}
