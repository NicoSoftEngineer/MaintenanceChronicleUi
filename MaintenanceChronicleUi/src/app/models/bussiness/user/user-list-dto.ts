import { RoleDetail } from "../role/role-detail";

export interface UserListDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: RoleDetail[];
}
export interface UserFilter {
  searchText: string;
  roles: any[];
}
