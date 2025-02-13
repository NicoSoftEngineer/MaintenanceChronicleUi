import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertStateService {
  private alertState = new BehaviorSubject<{ message: string, type: string; show: boolean }>({ message: '',type: 'success', show: false });
  alertState$ = this.alertState.asObservable();

  openAlert(message: string, type:string) {
    this.alertState.next({ message, type, show: true });
  }

  closeAlert() {
    this.alertState.next({ message: '',type:'', show: false });
  }
}
