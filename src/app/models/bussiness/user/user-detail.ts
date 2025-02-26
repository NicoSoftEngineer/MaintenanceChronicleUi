import { RoleDetail } from "../role/role-detail";

export interface UserDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: RoleDetail[];
}
