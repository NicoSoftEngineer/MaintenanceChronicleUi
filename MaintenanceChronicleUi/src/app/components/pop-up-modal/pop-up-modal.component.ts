import { Component, Input, input } from '@angular/core';
import { PopUpStateService } from './pop-up-state.service';

@Component({
  selector: 'mach:pop-up',
  imports: [],
  templateUrl: './pop-up-modal.component.html',
  styleUrl: './pop-up-modal.component.scss'
})
export class PopUpModalComponent {
  message: string = '';
  show: boolean = false;
  @Input() proceed: (id:string) => void = (id:string) => {};
  id: string = '';

  constructor(private popUpService: PopUpStateService) {
    this.popUpService.popUpState$.subscribe(popUp => {
      this.message = popUp.message;
      this.show = popUp.show;
      this.proceed = popUp.proceed;
      this.id = popUp.id;
    });
  }

  closePopUp = () => {
    this.popUpService.closePopUp();
  };
  proceedAction = () => {
    this.proceed(this.id);
    this.closePopUp();
  };
}
