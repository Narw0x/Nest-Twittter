export interface UserLogin {
  access_token: string;
  user: {
    _id: string;
    name: string;
    email: string
  };
}