import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MachineListDto } from '../models/bussiness/machine/machine-list-dto';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  protected readonly baseUrl = '/api/v1/machines';

  constructor(private httpClient: HttpClient) {}

  getMachines() : Observable<MachineListDto[]>{
    return this.httpClient.get<MachineListDto[]>(this.baseUrl).pipe();
  }

  deleteMachine(id: string) : Observable<undefined>{
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<undefined>(url).pipe();
  }


}
