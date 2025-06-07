import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { User, UserSchema } from './users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { TwitsModule } from './twits/twits.module';
import { TwitsService } from './twits/twits.service';
import { Twit, TwitSchema } from './twits/schemas/twit.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://martin_synak:Hva5l9M9Ka8ZMcQY@cluster0.kyph2.mongodb.net/Nest-test?retryWrites=true&w=majority&appName=Cluster0',
    ),
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Twit.name, schema: TwitSchema }]),
    JwtModule,
    TwitsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, AuthService, TwitsService],
})
export class AppModule {}
