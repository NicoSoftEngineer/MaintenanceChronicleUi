import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpStateService {
  private popUpState = new BehaviorSubject<{ message: string, proceed:(id: string) => void,id:string, show: boolean }>({ message: '', proceed: (id: string) =>{},id:'', show: false });
  popUpState$ = this.popUpState.asObservable();

  openPopUp(message: string, proceed:(id: string) => void,id:string) {
    this.popUpState.next({ message, proceed, id,show: true });
  }

  closePopUp() {
    this.popUpState.next({ message: '',proceed:() => {},id:'', show: false });
  }
}
