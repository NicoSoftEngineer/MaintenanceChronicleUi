import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertStateService {
  private alertState = new BehaviorSubject<{ message: string, show: boolean }>({ message: '', show: false });
  alertState$ = this.alertState.asObservable();

  openAlert(message: string) {
    this.alertState.next({ message, show: true });
  }

  closeAlert() {
    this.alertState.next({ message: '', show: false });
  }
}
