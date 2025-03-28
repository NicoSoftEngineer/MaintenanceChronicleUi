import { Component, input } from '@angular/core';
import { AlertStateService } from './alert-state.service';

@Component({
  selector: 'mach:alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  type = '';
  icon = input<'none' | 'success' | 'warning' | 'error'>('none');
  message: string = '';
  show: boolean = false;

  constructor(private alertService: AlertStateService) {
    this.alertService.alertState$.subscribe(alert => {
      this.message = alert.message;
      this.type = alert.type;
      this.show = alert.show;
    });
  }

  close() {
    this.alertService.closeAlert();
  }
}
