import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { NewCustomerDetail } from '../models/bussiness/customer/new-customer-detail';
import { CustomerDetail } from '../models/bussiness/customer/customer-detail';
import { CustomerListDto } from '../models/bussiness/customer/customer-list-dto';
import { CustomerInFilter } from '../models/bussiness/customer/customer-in-filter-dto';

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

  getCustomersForFilter(): Observable<CustomerInFilter[]> {
    const url = this.baseUrl;
    return this.httpClient.get<CustomerListDto[]>(url).pipe(
      tap((customers) =>
        customers.map((customer) =>
          ({ id: customer.id, name: customer.name })
        )
      ));
  }

  deleteCustomer(id: string): Observable<undefined> {
    const url = this.baseUrl + '/' + id;
    return this.httpClient.delete<undefined>(url).pipe();
  }

  updateCustomer(id: string, patchValue: any[]): Observable<CustomerDetail> {
    const url = this.baseUrl + '/' + id;
    return this.httpClient.patch<CustomerDetail>(url, patchValue).pipe();
  }

  getLocationsForCustomer(id: string): Observable<any> {
    const url = this.baseUrl + '/' + id + '/locations';
    return this.httpClient.get<any>(url).pipe();
  }
}
