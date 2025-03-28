import { filter } from 'rxjs';
import { Component, inject } from '@angular/core';
import { UserFilter, UserListDto } from '../../../models/bussiness/user/user-list-dto';
import { PopUpStateService } from '../../../components/pop-up-modal/pop-up-state.service';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { initFlowbite } from 'flowbite';
import { AlertComponent } from '../../../components/alert/alert.component';
import { PopUpModalComponent } from '../../../components/pop-up-modal/pop-up-modal.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { RoleDetail } from '../../../models/bussiness/role/role-detail';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import { MultiSelect } from '../../../components/multi-select/multi-select.component';
import { OffCanvasComponent } from '../../../components/off-canvas/off-canvas.component';

@Component({
  selector: 'app-user-list-page',
  imports: [
      AlertComponent,
      PopUpModalComponent,
      RouterLink,
      OffCanvasComponent,
      FormInputComponent,
      MultiSelect,
      FormsModule,
      ReactiveFormsModule,
    ],
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.scss'
})
export class UserListPageComponent {
protected readonly popUpStateService = inject(PopUpStateService);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly userService = inject(UserService);
  protected users: UserListDto[] = [];
  protected filteredUsers: UserListDto[] = [];
    protected roleOptions: RoleDetail[] = [];
  protected drawerOpen = false;
  protected filter: UserFilter = {
    searchText: '',
    roles: [],
  };

  constructor() {
    this.loadUsers();
    this.loadRolesForFilter();
  }
  ngOnInit(): void {
    initFlowbite();
  }

  delete = (id: string) => {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
    });
    this.loadUsers();
    this.alertStateService.openAlert('Lokace byla úspěšně vymazána', 'success');
  };

  loadUsers = () =>{
    this.userService.getUsers().subscribe((users) => {
      this.filteredUsers = users;
      this.users = users
    });
  }

  loadRolesForFilter(){
    this.userService.getRoles().subscribe((roles) => {
      this.roleOptions = roles;
    });
  }

  openPopUp = (user: UserListDto) => {
      this.popUpStateService.openPopUp(`Jste si jistí, že chcete vymazat uživatele "${user.firstName} ${user.lastName}"`, this.delete, user.id);
    };
    filterMachines = () => {
      console.log(this.filter);
      if (this.filter.searchText !== '') {
        this.filteredUsers = this.users.filter(
          (user) =>
            user.email
              .toLowerCase()
              .includes(this.filter.searchText.toLowerCase()) ||
              user.firstName
              .toLowerCase()
              .includes(this.filter.searchText.toLowerCase()) ||
              user.lastName
              .toLowerCase()
              .includes(this.filter.searchText.toLowerCase())
        );
      }
      if(this.filter.roles.length > 0){
        this.filteredUsers = this.users.filter((user) => {
          return user.roles.some((role) => this.filter.roles.map(r => r.name).includes(role.name));
        });
      }
      if (this.isFilterClear()) {
        this.filteredUsers = this.users;
      }
    };

    clearFilter = () => {
      this.filter = { searchText: '', roles: [] };
      this.filterMachines();
    };

    isFilterClear(): boolean {
      return (
        this.filter.searchText == '' &&
        this.filter.roles.length === 0
      );
    }
}
