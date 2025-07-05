import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsMongoId } from 'class-validator';
import { Document, Types } from 'mongoose';


export type LikeDocument = Like & Document;

@Schema({ timestamps: true })
export class Like {
  @IsNotEmpty()
  @IsMongoId()
  twitId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);