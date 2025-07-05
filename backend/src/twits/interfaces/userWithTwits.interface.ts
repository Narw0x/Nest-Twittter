import { User } from '../../users/user.schema';
import { Twit } from '../twit.schema';

export interface UserWithTwits {
  user: User;
  twits: Twit[];
}