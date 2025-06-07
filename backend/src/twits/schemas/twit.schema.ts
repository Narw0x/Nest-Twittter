import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TwitDocument = Twit & Document;

@Schema()
export class Twit {
  @Prop({ required: true, min: 1, max: 280 })
  content: string;

  @Prop({ required: true })
  authorId: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ type: [String], default: [] })
  likes: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TwitSchema = SchemaFactory.createForClass(Twit);
