import { Component, inject } from '@angular/core';
import { RecordService } from '../../../services/record-service';
import { RecordFilter, RecordListDto } from '../../../models/bussiness/records/record-list-dto';
import { AlertComponent } from '../../../components/alert/alert.component';
import { PopUpModalComponent } from '../../../components/pop-up-modal/pop-up-modal.component';
import { PopUpStateService } from '../../../components/pop-up-modal/pop-up-state.service';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { RouterLink } from '@angular/router';
import { CustomerInFilter } from '../../../models/bussiness/customer/customer-in-filter-dto';
import { LocationListDto } from '../../../models/bussiness/location/location-list-dto';
import { MachineFilter, MachineInFilterDto, MachineListDto } from '../../../models/bussiness/machine/machine-dto';
import { CustomerService } from '../../../services/customer-service';
import { LocationService } from '../../../services/location-service';
import { MachineService } from '../../../services/machine-service';
import { MultiSelect } from '../../../components/multi-select/multi-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import { OffCanvasComponent } from '../../../components/off-canvas/off-canvas.component';

@Component({
  selector: 'app-record-list-page',
  imports: [AlertComponent,
      PopUpModalComponent,
      RouterLink,
      OffCanvasComponent,
      FormInputComponent,
      MultiSelect,
      FormsModule,
      ReactiveFormsModule,],
  templateUrl: './record-list-page.component.html',
  styleUrl: './record-list-page.component.scss',
})
export class RecordListPageComponent {
  protected readonly recordService = inject(RecordService);
  protected readonly popUpStateService = inject(PopUpStateService);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly machineService = inject(MachineService);
  protected readonly locationService = inject(LocationService);
  protected readonly customerService = inject(CustomerService);
  protected locationsInFilter: LocationListDto[] = [];
  protected customersInFilter: CustomerInFilter[] = [];
  protected drawerOpen = false;
  protected machinesForFilter: MachineInFilterDto[] = [];
  public records: RecordListDto[] = [];
  protected filteredRecords: RecordListDto[] = [];
  protected filter: RecordFilter = {
    searchText: '',
    customer: [],
    location: [],
    machine: [],
  };

  constructor() {
    this.loadRecords();
    this.loadMachinesForFilter();
    this.loadCustomersInFilterList();
    this.loadLocationsInFilter();
  }

  loadCustomersInFilterList = () => {
    this.customerService.getCustomersForFilter().subscribe((customers) => {
      this.customersInFilter = customers;
    });
  };

  loadLocationsInFilter = () => {
    this.locationService.getLocationsForFilter().subscribe((locations) => {
      this.locationsInFilter = locations;
    });
  };

  deleteLocation = (id: string) => {
    this.recordService.deleteRecord(id).subscribe(() => {
      this.records = this.records.filter((record) => record.id !== id);
    });
    this.loadRecords();
    this.alertStateService.openAlert('Záznam byl úspěšně vymazán', 'success');
  };
  openPopUp = (record: RecordListDto) => {
    this.popUpStateService.openPopUp(
      `Jste si jistí, že chcete vymazat záznam z "${record.date}"`,
      this.deleteLocation,
      record.id
    );
  };
  loadRecords = () => {
    this.recordService.getRecords().subscribe((records) => {
      console.log(records);
      this.records = records;
      this.filteredRecords = records;
    });
  };
  loadMachinesForFilter = () => {
    this.machineService.getMachines().subscribe((machines) => {
      const machinesMapped = machines.map((machine) => {
        return {
          id: machine.id,
          name: machine.model,
        };
      });
      this.machinesForFilter = [...new Map(machinesMapped.map(v => [v.name, v])).values()]
    });
  };
  filterRecords = () => {
    if (this.filter.searchText !== '') {
      this.filteredRecords = this.records.filter(
        (record) =>
          record.machineName
            .toLowerCase()
            .includes(this.filter.searchText.toLowerCase()) ||
          record.locationName
            .toLowerCase()
            .includes(this.filter.searchText.toLowerCase()) ||
          record.type
            .toLowerCase()
            .includes(this.filter.searchText.toLowerCase())
      );
    }
    if (this.filter.customer.length > 0) {
      this.filteredRecords = this.records.filter((record) =>
        this.filter.customer.map((l) => l.name).includes(record.customerName)
      );
    }
    if (this.filter.location.length > 0) {
      this.filteredRecords = this.records.filter((record) =>
        this.filter.location.map((l) => l.name).includes(record.locationName)
      );
    }
    if (this.filter.machine.length > 0) {
      this.filteredRecords = this.records.filter((record) =>
        this.filter.machine.map((l) => l.name).includes(record.machineName)
      );
    }
    if(this.isFilterClear()) {
      this.filteredRecords = this.records;
    }
  };
  clearFilter = () => {
    this.filter = { searchText: '', customer: [], location: [], machine: [] };
    this.filterRecords();
  };

  isFilterClear(): boolean {
    return (
      this.filter.searchText == '' &&
      this.filter.customer.length === 0 &&
      this.filter.location.length === 0 &&
      this.filter.machine.length === 0
    );
  }
}
