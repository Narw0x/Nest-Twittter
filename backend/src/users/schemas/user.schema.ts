import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, min: 3, max: 50 })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, min: 6 })
  passwordHash: string;

  @Prop({ type: [String], default: [] })
  twitIds: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
