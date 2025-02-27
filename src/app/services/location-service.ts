import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationListDto } from '../models/bussiness/location/location-list-dto';
import { LocationDetailDto } from '../models/bussiness/location/location-detail-dto';
import { NewLocationDetailDto } from '../models/bussiness/location/new-location-detail-dto';
import { CustomerDetailForLocation } from '../models/bussiness/customer/customer-detail-for-location';
import { UserContactList } from '../models/bussiness/contact/user-contact-list';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private httpClient: HttpClient) {}
  protected readonly baseUrl = '/api/v1/locations';

  getLocations(): Observable<LocationListDto[]> {
    const url = this.baseUrl;
    return this.httpClient.get<LocationListDto[]>(url).pipe();
  }

  getLocationById(id: string): Observable<LocationDetailDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<LocationDetailDto>(url).pipe();
  }

  createLocation(location: NewLocationDetailDto): Observable<undefined> {
    const url = this.baseUrl;
    return this.httpClient.post<undefined>(url, location).pipe();
  }

  updateLocation(id: string, patchValue: any[]): Observable<LocationDetailDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.patch<LocationDetailDto>(url, patchValue).pipe();
  }

  deleteLocation(id: string): Observable<undefined> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<undefined>(url).pipe();
  };

  getCustomerForLocation(id: string): Observable<CustomerDetailForLocation> {
    const url = `${this.baseUrl}/${id}/customer`;
    return this.httpClient.get<CustomerDetailForLocation>(url).pipe();
  }

  getContactsForLocation(id: string): Observable<UserContactList[]> {
    const url = `${this.baseUrl}/${id}/contacts`;
    return this.httpClient.get<UserContactList[]>(url).pipe();
  }

  manageContactsForLocation(id: string, contacts: UserContactList[]): Observable<UserContactList[]> {
    const url = `${this.baseUrl}/${id}/contacts`;
    return this.httpClient.post<UserContactList[]>(url, contacts).pipe();
  }

  getAllContacts(): Observable<UserContactList[]> {
    const url = `${this.baseUrl}/contacts`;
    return this.httpClient.get<UserContactList[]>(url).pipe();
  }
}
