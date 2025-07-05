import { Types } from 'mongoose';

export default interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  passwordHash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
