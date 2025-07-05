import { User } from '../../users/user.schema';
import { Twit } from '../twit.schema';

export interface TwitsWithUsers {
  twit: Twit;
  user: {
    name: User['name'];
    email: User['email'];
  };
}