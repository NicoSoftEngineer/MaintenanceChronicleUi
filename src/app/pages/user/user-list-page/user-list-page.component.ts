import { Component, inject } from '@angular/core';
import { UserListDto } from '../../../models/bussiness/user/user-list-dto';
import { PopUpStateService } from '../../../components/pop-up-modal/pop-up-state.service';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { initFlowbite } from 'flowbite';
import { AlertComponent } from '../../../components/alert/alert.component';
import { PopUpModalComponent } from '../../../components/pop-up-modal/pop-up-modal.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-user-list-page',
  imports: [AlertComponent, PopUpModalComponent, RouterLink],
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.scss'
})
export class UserListPageComponent {
protected readonly popUpStateService = inject(PopUpStateService);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly userService = inject(UserService);
  protected users: UserListDto[] = [];
  constructor() {
    this.loadUsers();
  }
  ngOnInit(): void {
    initFlowbite();
  }

  // deleteLocation = (id: string) => {
  //   this.locationService.deleteLocation(id).subscribe(() => {
  //     this.locations = this.locations.filter((location) => location.id !== id);
  //   });
  //   this.loadLocations();
  //   this.alertStateService.openAlert('Lokace byla úspěšně vymazána', 'success');
  // };
  loadUsers = () =>{
    this.userService.getUsers().subscribe((users) => {
      this.users = users
    });
  }
}
