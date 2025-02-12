import { Component, input } from '@angular/core';
import { AlertStateService } from './alert-state.service';

@Component({
  selector: 'mach:alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  type = input<'error' | 'success' | 'warning' | 'info'>('info');
  icon = input<'none' | 'success' | 'warning' | 'error'>('none');
  message: string = '';
  show: boolean = false;

  constructor(private alertService: AlertStateService) {
    this.alertService.alertState$.subscribe(alert => {
      this.message = alert.message;
      this.show = alert.show;
    });
  }

  close() {
    this.alertService.closeAlert();
  }
}
