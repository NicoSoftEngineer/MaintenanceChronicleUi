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
  protected locations: LocationListDto[] = [];
  protected roleOptions: RoleDetail[] = [];
  protected selectedRoles: RoleDetail[] = [];
  protected multiSelectTouched: Boolean = false;
  private userDetail: { [key: string]: any } = {};

  /**
   *
   */
  constructor(private cdr: ChangeDetectorRef) {
  }

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

  updateUser() {}

  addUser() {
    const dataRaw = this.userFormular.getRawValue();
    const data = JSON.parse(JSON.stringify(dataRaw));
    data.roles = this.selectedRoles.map((r) => r.id);
    console.log(data);
    this.userService.createUser(data).subscribe({
      next: (id) => {
        this.alertStateService.openAlert(
          'Uživatel byl úspěšně vytvořen',
          'success'
        );
        this.router.navigate(['/users', id]);
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
