import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserListDto } from '../models/bussiness/user/user-list-dto';
import { UserDetail } from '../models/bussiness/user/user-detail';
import { RoleDetail } from '../models/bussiness/role/role-detail';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  protected readonly baseUrl = '/api/v1/users';

  public getUsers() : Observable<UserListDto[]> {
    return this.httpClient.get<UserListDto[]>(this.baseUrl).pipe(tap((users) => {
      console.log(users);
    }));
  }

  public deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  public createUser(user: UserDetail): Observable<string> {
    return this.httpClient.post<string>(this.baseUrl, user);
  }

  public getUserById(id: string): Observable<UserDetail> {
    return this.httpClient.get<UserDetail>(`${this.baseUrl}/${id}`);
  }

  public getRoles(): Observable<RoleDetail[]> {
    return this.httpClient.get<RoleDetail[]>(`${this.baseUrl}/roles`);
  }
}
