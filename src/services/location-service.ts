import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationListDto } from '../app/models/bussiness/location/location-list-dto';

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
}
