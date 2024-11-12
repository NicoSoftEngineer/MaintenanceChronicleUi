import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TenantListDto } from '../../app/models/tenant-list-dto';
import { NewTenantDto } from '../../app/models/new-tenant-dto';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private httpClient: HttpClient) {
  }

  protected readonly baseUrl = '/api/v1/tenants';

  getTenants(): Observable<TenantListDto[]> {
    const url = this.baseUrl;
    return this.httpClient.get<TenantListDto[]>(url);
  }
  createTenant(data : NewTenantDto): Observable<TenantListDto> {
    const url = this.baseUrl;
    return this.httpClient.post<TenantListDto>(url, data);
  }
}
