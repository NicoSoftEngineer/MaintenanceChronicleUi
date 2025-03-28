import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateReminderDto, ReminderDto } from '../models/bussiness/reminder/reminder-dto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  protected readonly baseUrl = '/api/v1/maintenance-reminders';
  private httpClient = inject(HttpClient);

  createReminder(reminder: CreateReminderDto): Observable<undefined> {
    return this.httpClient.post<undefined>(this.baseUrl, reminder).pipe();
  }

  updateReminder(id: string, patchValue: any[]): Observable<ReminderDto> {
    const url = `${this.baseUrl}/${id}`;
      return this.httpClient.patch<ReminderDto>(url, patchValue).pipe();
  }
}
