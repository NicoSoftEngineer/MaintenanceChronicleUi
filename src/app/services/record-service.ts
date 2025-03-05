import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateRecordDetailDto,
  RecordDetailDto,
  RecordListDto,
} from '../models/bussiness/records/record-list-dto';
import { Observable } from 'rxjs';
import { MachineDetailDto } from '../models/bussiness/machine/machine-dto';
import { RecordTypeDto } from '../models/bussiness/records/record-type-dto';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  protected readonly baseUrl = '/api/v1/maintenance-records';

  constructor(private httpClient: HttpClient) {}

  getRecords(): Observable<RecordListDto[]> {
    return this.httpClient.get<RecordListDto[]>(this.baseUrl).pipe();
  }
  deleteRecord(id: string): Observable<undefined> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<undefined>(url).pipe();
  }
  getRecordById(id: string): Observable<RecordDetailDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<RecordDetailDto>(url).pipe();
  }
  getMachineForRecord(id: string): Observable<MachineDetailDto> {
    const url = `${this.baseUrl}/${id}/machine`;
    return this.httpClient.get<MachineDetailDto>(url).pipe();
  }
  getRecordTypes(): Observable<RecordTypeDto[]> {
    return this.httpClient.get<RecordTypeDto[]>(`${this.baseUrl}/types`).pipe();
  }
  createRecord(machine: CreateRecordDetailDto): Observable<undefined> {
    return this.httpClient.post<undefined>(this.baseUrl, machine).pipe();
  }
  updateRecord(id: string, patchValue: any[]): Observable<RecordDetailDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.patch<RecordDetailDto>(url, patchValue).pipe();
  }
}
