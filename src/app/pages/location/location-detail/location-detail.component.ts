import { Component, inject } from '@angular/core';
import { AlertComponent } from '../../../components/alert/alert.component';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { getJsonPatch } from '../../../utils/patch-form-helper.service';
import { CustomerDetailForLocation } from '../../../models/bussiness/customer/customer-detail-for-location';
import { LocationService } from '../../../services/location-service';
import { CustomerService } from '../../../services/customer-service';

@Component({
  selector: 'app-location-detail',
  imports: [AlertComponent, FormInputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.scss',
})
export class LocationDetailComponent {
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly fb = inject(FormBuilder);
  protected readonly locationService = inject(LocationService);
  protected readonly customerService = inject(CustomerService);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly getJsonPatch = getJsonPatch;
  protected customerDetail!: CustomerDetailForLocation;
  private locationDetail: { [key: string]: any } = {};

  protected locationFormular = this.fb.group({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    street: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    city: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    country: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    customerId:'',
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id && id !== 'new') {
      this.locationService.getLocationById(id).subscribe({
        next: (location) => {
          this.locationDetail = location;
          this.locationFormular.patchValue(location);
        },
        error: (error) => {
          this.alertStateService.openAlert(
            'Něco se pokazilo, zkuste to prosím znovu',
            'error'
          );
        },
      });
      this.getCustomerDetail();
    }

    const custId = this.route.snapshot.queryParamMap.get('customerId')!;
    if(custId){
      this.locationFormular.controls['customerId'].setValue(custId);
      this.customerService.getCustomerById(custId).subscribe({
        next: (customer) => {
          console.log(customer);
          this.customerDetail = customer as CustomerDetailForLocation;
        }
      });
    }
  }

  getCustomerDetail(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.locationService.getCustomerForLocation(id).subscribe({
      next: (customer) => {
        this.customerDetail = customer;
      }
    });
  }

  onSubmit(): void {
    this.locationFormular.markAllAsTouched();
    if (this.locationFormular.invalid) {
      return;
    }

    if (this.locationDetail['id']) {
      this.updateLocation();
      return;
    }
    this.addLocation();
  }

  updateLocation(){
    const patchValue = this.getJsonPatch(this.locationFormular, this.locationDetail);
    this.locationService.updateLocation(this.locationDetail['id'], patchValue).subscribe({
      next: (cust) => {
        this.locationDetail = cust;
        this.locationFormular.patchValue(cust);
        this.alertStateService.openAlert(
          'Pobočka byla úspěšně upravena',
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

  addLocation(){
    const dataRaw = this.locationFormular.getRawValue();
    const data = JSON.parse(JSON.stringify(dataRaw));
    console.log(data);
    this.locationService.createLocation(data).subscribe({
      next: (id) => {
        this.alertStateService.openAlert(
          'Pobočka byla úspěšně vytvořena',
          'success'
        );
        this.router.navigate(['/locations', id]);
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
