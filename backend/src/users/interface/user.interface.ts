export default interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  twits?: string[];
  liked?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
