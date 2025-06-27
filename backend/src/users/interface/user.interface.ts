export default interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  passwordHash?: string;
  twitIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
