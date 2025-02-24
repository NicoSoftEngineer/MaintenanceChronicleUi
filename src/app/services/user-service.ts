import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserListDto } from '../models/bussiness/user/user-list-dto';
import { UserDetail } from '../models/bussiness/user/user-detail';

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

  public createUser(user: UserDetail): Observable<UserDetail> {
    return this.httpClient.post<UserDetail>(this.baseUrl, user);
  }
}
