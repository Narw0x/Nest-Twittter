import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsMongoId, IsString } from 'class-validator';

export type TwitDocument = Twit & Document;

@Schema({ timestamps: true })
export class Twit {
  @Prop({ required: true })
  @IsString()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  @IsMongoId()
  userId: Types.ObjectId;
}

export const TwitSchema = SchemaFactory.createForClass(Twit);