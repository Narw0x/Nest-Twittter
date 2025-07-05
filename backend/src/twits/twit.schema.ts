import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsNotEmpty, IsMongoId, IsString } from 'class-validator';

export type TwitDocument = Twit & Document;

@Schema({timestamps: true})
export class Twit {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;
}

export const TwitSchema = SchemaFactory.createForClass(Twit);
