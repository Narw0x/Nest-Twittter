import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTwitDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
