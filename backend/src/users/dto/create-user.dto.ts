import { IsString, IsEmail, MinLength, IsArray } from 'class-validator';

export class createUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsArray()
  twits?: string[];

  @IsArray()
  liked?: string[];
}
