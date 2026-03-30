import { Role } from '../enums/role.enum';

export type CurrentUser = {
  username: string;
  role: Role;
};
