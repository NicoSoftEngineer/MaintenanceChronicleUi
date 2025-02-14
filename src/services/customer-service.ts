import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewCustomerDetail } from '../app/models/bussiness/customer/new-customer-detail';
import { CustomerListDto } from '../app/models/bussiness/customer/customer-list-dto';
import { CustomerDetail } from '../app/models/bussiness/customer/customer-detail';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}
  protected readonly baseUrl = '/api/v1/customers';

  createCustomer(data: NewCustomerDetail): Observable<undefined> {
    const url = this.baseUrl;
    return this.httpClient.post<undefined>(url, data).pipe();
  }

  getCustomerById(id: string): Observable<CustomerDetail> {
    const url = this.baseUrl + '/' + id;
    return this.httpClient.get<CustomerDetail>(url).pipe();
  }

  getCustomers(): Observable<CustomerListDto[]> {
    const url = this.baseUrl;
    return this.httpClient.get<CustomerListDto[]>(url).pipe();
  }

  deleteCustomer(id: string): Observable<undefined> {
    const url = this.baseUrl + '/' + id;
    return this.httpClient.delete<undefined>(url).pipe();
  }

  updateCustomer(id: string, patchValue: any[]): Observable<CustomerDetail> {
    const url = this.baseUrl + '/' + id;
    return this.httpClient.patch<CustomerDetail>(url, patchValue).pipe();
  }
}
