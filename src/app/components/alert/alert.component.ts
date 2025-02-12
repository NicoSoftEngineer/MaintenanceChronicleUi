import { Component, Input, input, signal } from '@angular/core';

@Component({
  selector: 'mach:alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

type = input<'error' | 'success' | 'warning' | 'info'>('info');
icon = input<'none' | 'success' | 'warning' | 'error'>('none');
message = input<string>('');

private visiblePriv = signal<boolean>((false)); // Internal state

  @Input()
  set visible(val: boolean) {
    this.visiblePriv.set(val); // Transform value
  }

  get visible() {
    return this.visiblePriv();
  }

closeButton() {
  this.visiblePriv.set(false);
}

}
