import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TenantListDto } from '../../app/models/tenant-list-dto';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private httpClient: HttpClient) {
  }

  

  protected readonly baseUrl = '/api/v1/Tenant';

  getTenants(): Observable<TenantListDto[]> {
    const url = this.baseUrl + '/list';
    return this.httpClient.get<TenantListDto[]>(url);
  }
}
