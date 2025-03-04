import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecordListDto } from '../models/bussiness/records/record-list-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  protected readonly baseUrl = '/api/v1/maintenance-records';


  constructor(private httpClient: HttpClient) {}

  getRecords(): Observable<RecordListDto[]> {
    return this.httpClient.get<RecordListDto[]>(this.baseUrl).pipe();
  }
  deleteRecord(id:string): Observable<undefined> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<undefined>(url).pipe();
  }
}
