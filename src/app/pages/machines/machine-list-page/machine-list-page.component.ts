import { Component, inject, model } from '@angular/core';
import { AlertComponent } from '../../../components/alert/alert.component';
import { RouterLink } from '@angular/router';
import { PopUpModalComponent } from '../../../components/pop-up-modal/pop-up-modal.component';
import {
  MachineFilter,
  MachineListDto,
} from '../../../models/bussiness/machine/machine-dto';
import { PopUpStateService } from '../../../components/pop-up-modal/pop-up-state.service';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { MachineService } from '../../../services/machine-service';
import { OffCanvasComponent } from '../../../components/off-canvas/off-canvas.component';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import { MultiSelect } from '../../../components/multi-select/multi-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../../../services/location-service';
import { CustomerService } from '../../../services/customer-service';
import { LocationListDto } from '../../../models/bussiness/location/location-list-dto';
import { CustomerInFilter } from '../../../models/bussiness/customer/customer-in-filter-dto';

@Component({
  selector: 'app-machine-list-page',
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

  templateUrl: './machine-list-page.component.html',
  styleUrl: './machine-list-page.component.scss',
})
export class MachineListPageComponent {
  protected readonly popUpStateService = inject(PopUpStateService);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly machineService = inject(MachineService);
  protected readonly locationService = inject(LocationService);
  protected readonly customerService = inject(CustomerService);
  protected locationsInFilter: LocationListDto[] = [];
  protected customersInFilter: CustomerInFilter[] = [];
  protected filter: MachineFilter = {
    searchText: '',
    customer: [],
    location: [],
  };
  protected drawerOpen = false;
  protected machines: MachineListDto[] = [];
  protected filteredMachines: MachineListDto[] = [];

  constructor() {
    this.loadMachines();
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
    this.machineService.deleteMachine(id).subscribe(() => {
      this.machines = this.machines.filter((machines) => machines.id !== id);
    });
    this.loadMachines();
    this.alertStateService.openAlert('Stroj byl úspěšně vymazán', 'success');
  };
  openPopUp = (machine: MachineListDto) => {
    this.popUpStateService.openPopUp(
      `Jste si jistí, že chcete vymazat stroj "${machine.model}"`,
      this.deleteLocation,
      machine.id
    );
  };
  loadMachines = () => {
    this.machineService.getMachines().subscribe((machines) => {
      this.machines = machines;
    });
  };
  filterMachines = () => {
    console.log(this.filter);
    if (this.filter.searchText !== '') {
      this.filteredMachines = this.machines.filter(
        (machine) =>
          machine.model
            .toLowerCase()
            .includes(this.filter.searchText.toLowerCase()) ||
          machine.customerName
            .toLowerCase()
            .includes(this.filter.searchText.toLowerCase()) ||
          machine.locationName
            .toLowerCase()
            .includes(this.filter.searchText.toLowerCase())
      );
    }
    if (this.filter.customer.length > 0) {
      this.filteredMachines = this.machines.filter((machine) =>
        this.filter.customer.map((l) => l.name).includes(machine.customerName)
      );
    }
    if (this.filter.location.length > 0) {
      this.filteredMachines = this.machines.filter((machine) =>
        this.filter.location.map((l) => l.name).includes(machine.locationName)
      );
    }
    if (this.isFilterClear()) {
      this.filteredMachines = this.machines;
    }
  };

  clearFilter = () => {
    this.filter = { searchText: '', customer: [], location: [] };
    this.filterMachines();
  };

  isFilterClear(): boolean {
    return (
      this.filter.searchText == '' &&
      this.filter.customer.length === 0 &&
      this.filter.location.length === 0
    );
  }
}
