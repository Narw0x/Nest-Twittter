// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ||
        '00000000000000000000000000000000',
    });
  }

  async validate(payload: { email: string; sub: string }) {
    const user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
    return { _id: user._id, name: user.name, email: user.email };
  }
}
