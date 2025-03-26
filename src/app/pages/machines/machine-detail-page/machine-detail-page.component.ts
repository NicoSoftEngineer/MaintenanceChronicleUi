import { LocationService } from './../../../services/location-service';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../../services/customer-service';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { getJsonPatch } from '../../../utils/patch-form-helper.service';
import { MachineService } from '../../../services/machine-service';
import { LocationDetailDto } from '../../../models/bussiness/location/location-detail-dto';
import { AlertComponent } from '../../../components/alert/alert.component';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import QRCodeStyling from 'qr-code-styling';
import { QrCodeComponent } from '../../../components/qr-code/qr-code.component';
import { AuthService } from '../../../services/auth-service';
import { MachineRecordInListDto } from '../../../models/bussiness/records/record-list-dto';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-machine-detail-page',
  imports: [
    AlertComponent,
    RouterLink,
    FormInputComponent,
    FormsModule,
    ReactiveFormsModule,
    QrCodeComponent,
  ],
  templateUrl: './machine-detail-page.component.html',
  styleUrl: './machine-detail-page.component.scss',
})
export class MachineDetailPageComponent {
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly fb = inject(FormBuilder);
  protected readonly machineService = inject(MachineService);
  protected readonly locationService = inject(LocationService);
  protected readonly customerService = inject(CustomerService);
  protected readonly authService = inject(AuthService);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly getJsonPatch = getJsonPatch;
  protected records: MachineRecordInListDto[] = [];
  protected locationDetail: LocationDetailDto = {} as LocationDetailDto;
  private machineDetail: { [key: string]: any } = {};
  protected sideText = '';
  protected viewRecordSection = true;

  protected machineFormular = this.fb.group({
    model: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    manufacture: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    serialNumber: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    color: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    inUseSince: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    locationId: '',
  });

  async ngOnInit(): Promise<void> {
    // Await the initial login status check before proceeding.
    await this.authService.checkLoginStatus();

    // Subscribe to login status changes.
    this.authService.isLoggedIn$.subscribe((status) => {
      if (!status) {
        // Use the current route parameter (id) for the unauthorized redirect.
        const id = this.route.snapshot.paramMap.get('id');
        this.router.navigate(['machines-unauthorized', id]);
      }
    });

    // Subscribe to changes in both route parameters and query parameters.
    combineLatest([this.route.paramMap, this.route.queryParams]).subscribe(([params, queryParams]) => {
      const id = params.get('id');
      // Optionally, if you have a "justCreated" query parameter to display an alert, add it here.
      const justCreated = queryParams['justCreated'];
      if (justCreated) {
        this.alertStateService.openAlert(
          'Zařízení bylo úspěšně vytvořeno',
          'success'
        );
      }

      if (id && id !== 'new') {
        // Get machine details.
        this.machineService.getMachineById(id).subscribe({
          next: (machine) => {
            // Format the inUseSince date.
            machine.inUseSince = new Date(machine.inUseSince).toISOString().split('T')[0];
            this.sideText = machine['model'] + ' - ' + machine['serialNumber'];
            this.machineDetail = machine;
            this.machineFormular.patchValue(machine);
          },
          error: (error) => {
            this.alertStateService.openAlert('Něco se pokazilo, zkuste to prosím znovu', 'error');
          },
        });
        // Get location for the machine.
        this.machineService.getLocationForMachine(id).subscribe({
          next: (location) => {
            this.locationDetail = location;
          },
        });
        // Get records for the machine.
        this.machineService.getRecordsForMachine(id).subscribe({
          next: (records) => {
            this.records = records;
          },
          error: (error) => {
            this.alertStateService.openAlert('Nedokázalo se získat záznamy pro tento stroj!', 'error');
          }
        });
      } else {
        // If the machine id is 'new' or missing, try getting the locationId from query parameters.
        const locationId = queryParams['locationId'];
        if (locationId) {
          // Set the locationId value on the machine form.
          this.machineFormular.controls['locationId'].setValue(locationId);
          // Get location details.
          this.locationService.getLocationById(locationId).subscribe({
            next: (location) => {
              this.locationDetail = location;
            },
            error: (error) => {
              this.alertStateService.openAlert('Něco se pokazilo, zkuste to prosím znovu', 'error');
            },
          });
        }
      }
    });
  }

  onSubmit(): void {
    this.machineFormular.markAllAsTouched();
    if (this.machineFormular.invalid) {
      return;
    }

    if (this.machineDetail['id']) {
      this.updateMachine();
      return;
    }
    this.addMachine();
  }

  updateMachine() {
    let patchValue = this.getJsonPatch(
      this.machineFormular,
      this.machineDetail
    );
    patchValue = patchValue.filter((p) => p.path !== 'locationId');
    console.log(patchValue);
    this.machineService
      .updateMachine(this.machineDetail['id'], patchValue)
      .subscribe({
        next: (mach) => {
          this.machineDetail = mach;
          this.machineFormular.patchValue(mach);
          this.alertStateService.openAlert(
            'Stroj byl úspěšně upraven',
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

  addMachine() {
    const dataRaw = this.machineFormular.getRawValue();
    const data = JSON.parse(JSON.stringify(dataRaw));
    console.log(data);
    this.machineService.createMachine(data).subscribe({
      next: (id) => {
        this.router.navigate(['/machines', id], {queryParams:{  justCreated: true}});
      },
      error: (error) => {
        this.alertStateService.openAlert(
          'Něco se pokazilo, zkuste to prosím znovu',
          'error'
        );
      },
    });
  }

  newRecord(){
    this.router.navigate(['/records', ''],{queryParams:{  machineId: this.machineDetail['id']}});
  }
}
