import { BaseObject } from './types';

export interface UserObject extends BaseObject {
  name?: string;
  email?: string;
  fullName?: string;
  role?: string;
}
