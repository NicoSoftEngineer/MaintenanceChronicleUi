import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MachineDetailDto,
  MachineListDto,
  NewMachineDetailDto,
} from '../models/bussiness/machine/machine-dto';
import { LocationDetailDto } from '../models/bussiness/location/location-detail-dto';
import { MachineRecordInListDto } from '../models/bussiness/records/record-list-dto';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  protected readonly baseUrl = '/api/v1/machines';

  constructor(private httpClient: HttpClient) {}

  getMachines(): Observable<MachineListDto[]> {
    return this.httpClient.get<MachineListDto[]>(this.baseUrl).pipe();
  }

  deleteMachine(id: string): Observable<undefined> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<undefined>(url).pipe();
  }

  getMachineById(id: string): Observable<MachineDetailDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<MachineDetailDto>(url).pipe();
  }

  createMachine(machine: NewMachineDetailDto): Observable<NewMachineDetailDto> {
    return this.httpClient
      .post<NewMachineDetailDto>(this.baseUrl, machine)
      .pipe();
  }

  updateMachine(id: string, patchValue: any[]): Observable<MachineDetailDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.patch<MachineDetailDto>(url, patchValue).pipe();
  }

  getLocationForMachine(id: string): Observable<LocationDetailDto> {
    const url = `${this.baseUrl}/${id}/location`;
    return this.httpClient.get<LocationDetailDto>(url).pipe();
  }

  getRecordsForMachine(id: string): Observable<MachineRecordInListDto[]> {
    const url = `${this.baseUrl}/${id}/maintenance-records`;
    return this.httpClient.get<MachineRecordInListDto[]>(url).pipe();
  }
}
