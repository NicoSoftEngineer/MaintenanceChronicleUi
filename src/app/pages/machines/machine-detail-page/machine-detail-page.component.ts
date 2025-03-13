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

  async ngOnInit() {
    await this.authService.checkLoginStatus();
    this.authService.isLoggedIn$.subscribe((status) => {
      if (!status) {
        this.router.navigate(['machines-unauthorized',  this.route.snapshot.paramMap.get('id') ]);
      }
    });
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id && id !== 'new') {
      this.machineService.getMachineById(id).subscribe({
        next: (machine) => {
          machine.inUseSince = new Date(machine.inUseSince).toISOString().split('T')[0];
          this.sideText = machine['model'] + ' - ' + machine['serialNumber'];
          this.machineDetail = machine;
          this.machineFormular.patchValue(machine);
        },
        error: (error) => {
          this.alertStateService.openAlert(
            'Něco se pokazilo, zkuste to prosím znovu',
            'error'
          );
        },
      });
      this.machineService.getLocationForMachine(id).subscribe({
        next: (location) => {
          this.locationDetail = location;
        },
      });
      this.machineService.getRecordsForMachine(id).subscribe({
        next: (records) => {
          this.records = records;
        },
        error: (error) => {
          this.alertStateService.openAlert(
            'Nedokázalo se získat záznamy pro tento stroj!',
            'error'
          );
        }
      });
      return;
    }

    const locationId = this.route.snapshot.queryParamMap.get('locationId')!;
    if (locationId) {
      this.machineFormular.controls['locationId'].setValue(locationId);
      this.locationService.getLocationById(locationId).subscribe({
        next: (location) => {
          this.locationDetail = location;
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
        this.alertStateService.openAlert(
          'Pobočka byla úspěšně vytvořena',
          'success'
        );
        this.router.navigate(['/machines', id]);
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
