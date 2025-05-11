import { RecordTypeDto } from './../../../models/bussiness/records/record-type-dto';
import { LocationService } from './../../../services/location-service';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { AuthService } from '../../../services/auth-service';
import { RecordService } from '../../../services/record-service';
import { MachineDetailDto } from '../../../models/bussiness/machine/machine-dto';
import { MultiSelect } from '../../../components/multi-select/multi-select.component';
import { DatePickerComponent } from '../../../components/date-picker/date-picker.component';
@Component({
  selector: 'app-record-detail-page',
  imports: [
    AlertComponent,
    RouterLink,
    FormInputComponent,
    FormsModule,
    ReactiveFormsModule,
    MultiSelect,
    DatePickerComponent
  ],
  templateUrl: './record-detail-page.component.html',
  styleUrl: './record-detail-page.component.scss',
})
export class RecordDetailPageComponent implements OnInit {
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly fb = inject(FormBuilder);
  protected readonly machineService = inject(MachineService);
  protected readonly locationService = inject(LocationService);
  protected readonly recordService = inject(RecordService);
  protected readonly authService = inject(AuthService);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly getJsonPatch = getJsonPatch;
  protected machineDetail: MachineDetailDto = {} as MachineDetailDto;
  protected typeOptions: RecordTypeDto[] = [];
  protected selectedType: RecordTypeDto[] = [];
  private recordDetail: { [key: string]: any } = {};

  protected recordFormular = this.fb.group({
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    machineId: '',
  });

  ngOnInit(): void {
    this.recordService.getRecordTypes().subscribe({
      next: (types) => {
        this.typeOptions = types;
      },
      error: (error) => {
        this.alertStateService.openAlert(
          'Něco se pokazilo, zkuste to prosím znovu',
          'error'
        );
      },
    });

    const justCreated = this.route.snapshot.queryParamMap.get('justCreated');
    if (justCreated) {
      this.alertStateService.openAlert(
        'Záznam byl úspěšně vytvořen',
        'success'
      );
    }

    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.recordService.getRecordById(id).subscribe((record) => {
        this.selectedType = this.typeOptions.filter(
          (o) => o.name == record.type
        );
        this.recordDetail = record;
        this.recordFormular.patchValue(record);
      });
      this.recordService.getMachineForRecord(id).subscribe({
        next: (machine) => {
          this.machineDetail = machine;
        },
      });
    }

    const machineId = this.route.snapshot.queryParamMap.get('machineId')!;
    if (machineId) {
      this.recordFormular.controls['machineId'].setValue(machineId);
      this.machineService.getMachineById(machineId).subscribe({
        next: (machine) => {
          this.machineDetail = machine;
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
    this.recordFormular.markAllAsTouched();
    if (this.recordFormular.invalid) {
      return;
    }

    if (this.recordDetail['id']) {
      this.updateRecord();
      return;
    }
    this.addRecord();
  }

  updateRecord() {
    let patchValue = this.getJsonPatch(this.recordFormular, this.recordDetail);
    if (this.checkIfTypeChanged()) {
      patchValue.push({
        op: 'replace',
        path: '/type',
        value: this.selectedType[0].id,
      });
    }
    patchValue = patchValue.filter((p) => p.path !== 'machineId');
    this.recordService
      .updateRecord(this.recordDetail['id'], patchValue)
      .subscribe({
        next: (rec) => {
          this.recordDetail = rec;
          this.recordFormular.patchValue(rec);
          this.alertStateService.openAlert(
            'Záznam byl úspěšně upraven',
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

  addRecord() {
    const dataRaw = this.recordFormular.getRawValue();
    const data = JSON.parse(JSON.stringify(dataRaw));
    data.recordType = this.selectedType[0].id;
    this.recordService.createRecord(data).subscribe({
      next: (id) => {
        this.router.navigate(['/records', id], {
          queryParams: { justCreated: true },
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

  checkIfTypeChanged(): boolean {
    if (this.recordDetail['type'] && this.selectedType.length > 0) {
      return this.recordDetail['type'] !== this.selectedType[0];
    }
    return false;
  }
}
