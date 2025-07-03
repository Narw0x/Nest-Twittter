import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateTwitDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
