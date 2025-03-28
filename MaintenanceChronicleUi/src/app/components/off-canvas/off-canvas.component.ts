import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mach:offCanvas',
  imports: [],
  templateUrl: './off-canvas.component.html',
  styleUrl: './off-canvas.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0%)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('out => in', animate('100ms ease-in-out')),
      transition('in => out', animate('100ms ease-in-out'))
    ])
  ]
})
export class OffCanvasComponent {
  @Input() title: string = 'Drawer Title';
  @Input() confirmLabel: string = 'Uložit';
  @Input() cancelLabel: string = 'Zrušit';
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  @Output() saved = new EventEmitter<void>();

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  save() {
    this.saved.emit();
    this.close();
  }
}
