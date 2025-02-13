import { Component, inject, OnInit } from '@angular/core';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlertComponent } from '../../../components/alert/alert.component';
import { CustomerService } from '../../../../services/customer-service';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { getErrorMessage } from '../../../utils/form-control-error-helper.service';

@Component({
  selector: 'app-customer-detail-page',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormInputComponent,
    AlertComponent,
  ],
  templateUrl: './customer-detail-page.component.html',
  styleUrl: './customer-detail-page.component.scss',
})
export class CustomerDetailPageComponent implements OnInit {
  protected readonly route = inject(ActivatedRoute);
  protected readonly fb = inject(FormBuilder);
  protected readonly customerService = inject(CustomerService);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly getErrorMessage = getErrorMessage;

  protected customerFormular = this.fb.group({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phoneNumber: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    conpanyRegistrationId: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.customerService.getCustomerById(id).subscribe({
        next: (customer) => {
          this.customerFormular.patchValue(customer);
        },
        error: (error) => {
          this.alertStateService.openAlert(
            'Něco se pokazilo, zkuste to prosím znovu',
            'error'
          );
        },
      });
    }
  }

  onSubmit() {
    this.customerFormular.markAllAsTouched();
    if (this.customerFormular.invalid) {
      return;
    }

    const dataRaw = this.customerFormular.getRawValue();
    const data = JSON.parse(JSON.stringify(dataRaw));

    this.customerService.createCustomer(data).subscribe({
      next: () => {
        this.alertStateService.openAlert(
          'Zákazník byl úspěšně vytvořen',
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
  }
}
