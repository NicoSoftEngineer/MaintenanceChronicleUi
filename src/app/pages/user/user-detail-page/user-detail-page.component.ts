import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import {
  applyBackendErrors,
  getErrorMessage,
} from '../../../utils/form-control-error-helper.service';
import { LocationListDto } from '../../../models/bussiness/location/location-list-dto';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import { AlertComponent } from '../../../components/alert/alert.component';
import { UserDetail } from '../../../models/bussiness/user/user-detail';
import { MultiSelect } from '../../../components/multi-select/multi-select.component';
import { RoleDetail } from '../../../models/bussiness/role/role-detail';
import { getJsonPatch } from '../../../utils/patch-form-helper.service';

@Component({
  selector: 'app-user-detail-page',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormInputComponent,
    AlertComponent,
    RouterLink,
    MultiSelect
  ],
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss'],
})
export class UserDetailPageComponent implements OnInit {
  protected readonly route = inject(ActivatedRoute);
  protected readonly fb = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly userService = inject(UserService);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly getErrorMessage = getErrorMessage;
  protected readonly applyBackendErrors = applyBackendErrors;
  protected readonly getJsonPatch = getJsonPatch;
  protected locations: LocationListDto[] = [];
  protected roleOptions: RoleDetail[] = [];
  protected selectedRoles: RoleDetail[] = [];
  protected multiSelectTouched: Boolean = false;
  private userDetail: { [key: string]: any } = {};

  protected userFormular = this.fb.group({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    console.log("init in user-detail-page");
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.userService.getUserById(id).subscribe({
        next: (user) => {
          this.selectedRoles = user.roles;
          console.log('selected roles loaded in user-detail')
          console.log(this.selectedRoles);
          this.userDetail = user;
          this.userFormular.patchValue(user);
        },
        error: (error) => {
          this.alertStateService.openAlert(
            'Něco se pokazilo, zkuste to prosím znovu',
            'error'
          );
        },
      });
    }
    this.userService.getRoles().subscribe((r) => {
      this.roleOptions = r;
      console.log('roles loaded in user-detail')
    });
  }

  onSubmit() {
    this.userFormular.markAllAsTouched();
    this.multiSelectTouched = true;
    if (this.userFormular.invalid || this.selectedRoles.length === 0) {
      return;
    }

    if (this.userDetail['id']) {
      this.updateUser();
      return;
    }
    this.addUser();
  }

  updateUser() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const patchValue = this.getJsonPatch(this.userFormular, this.userDetail);
    this.userService.updateUser(id, patchValue).subscribe({
      next: (user) => {
        this.userDetail = user;
        this.userFormular.patchValue(user);
        this.userService.manageUserRoles(id, this.selectedRoles).subscribe({
          next: () => {
            this.alertStateService.openAlert(
              'Uživatel byl úspěšně upraven',
              'success'
            );
          },
          error: (error) => {
            this.alertStateService.openAlert(
              'Něco se pokazilo, zkuste to prosím znovu',
              'error'
            );
          },
        });
      },
      error: (error) => {
        this.alertStateService.openAlert(
          'Něco se pokazilo, zkuste to prosím znovu',
          'error'
        );
      },
    });

  }

  addUser() {
    const dataRaw = this.userFormular.getRawValue();
    const data = JSON.parse(JSON.stringify(dataRaw));
    data.roles = this.selectedRoles.map((r) => r.id);
    console.log(data);
    this.userService.createUser(data).subscribe({
      next: (id) => {
        this.userService.sendUserInvitation(data.email).subscribe({
          next: () => {
            this.router.navigate(['/users', id]);
          }
        });
        this.alertStateService.openAlert(
          'Uživatel byl úspěšně vytvořen',
          'success'
        );
      },
      error: (errors) => {
        if (errors.error.errors) {
          this.applyBackendErrors(this.userFormular, errors.error.errors);
        } else {
          this.alertStateService.openAlert(
            'Něco se pokazilo, zkuste to prosím znovu',
            'error'
          );
        }
      },
    });
  }
}
