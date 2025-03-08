import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { PopUpStateService } from '../../../components/pop-up-modal/pop-up-state.service';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { LocationListDto } from '../../../models/bussiness/location/location-list-dto';
import { AlertComponent } from '../../../components/alert/alert.component';
import { PopUpModalComponent } from '../../../components/pop-up-modal/pop-up-modal.component';
import { RouterLink } from '@angular/router';
import { LocationService } from '../../../services/location-service';
import { CustomerFilterDto } from '../../../models/bussiness/customer/customer-filter-dto';
import { CustomerService } from '../../../services/customer-service';
import { CustomerInFilter } from '../../../models/bussiness/customer/customer-in-filter-dto';
import { OffCanvasComponent } from '../../../components/off-canvas/off-canvas.component';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import { LocationFilter } from '../../../models/bussiness/location/location-filter';
import { MultiSelect } from '../../../components/multi-select/multi-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-list-page',
  imports: [AlertComponent, PopUpModalComponent, RouterLink, OffCanvasComponent, FormInputComponent, MultiSelect, FormsModule, ReactiveFormsModule,],
  templateUrl: './location-list-page.component.html',
  styleUrl: './location-list-page.component.scss',
})
export class LocationListPageComponent implements OnInit {
  protected readonly popUpStateService = inject(PopUpStateService);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly locationService = inject(LocationService);
  protected readonly customerService = inject(CustomerService);
  protected locations: LocationListDto[] = [];
  protected filteredLocations: LocationListDto[] = [];
  protected customersInFilterList: CustomerInFilter[] = [];
  protected filter: LocationFilter = { searchText: '', customer: [] };
  protected drawerOpen = false;

  constructor() {
    this.loadLocations();
    this.loadCustomersInFilterList();
  }
  ngOnInit(): void {
    initFlowbite();
  }

  deleteLocation = (id: string) => {
    this.locationService.deleteLocation(id).subscribe(() => {
      this.locations = this.locations.filter((location) => location.id !== id);
    });
    this.loadLocations();
    this.alertStateService.openAlert('Lokace byla úspěšně vymazána', 'success');
  };
  openPopUp = (location: LocationListDto) => {
      this.popUpStateService.openPopUp(`Jste si jistí, že chcete vymazat zákazníka "${location.name}"`, this.deleteLocation, location.id);
    };
  loadLocations = () =>{
    this.locationService.getLocations().subscribe((locations) => {
      this.locations = locations
      this.filteredLocations = locations;
    });
  }
  loadCustomersInFilterList = () => {
    this.customerService.getCustomersForFilter().subscribe((customers) => {
      this.customersInFilterList = customers;
    });
  }
  filterLocations = () => {
    console.log(this.filter);
    if(this.filter.searchText !== ''){
      this.filteredLocations = this.locations.filter((location) => location.name.toLowerCase().includes(this.filter.searchText.toLowerCase())
      || location.city.toLowerCase().includes(this.filter.searchText.toLowerCase())
      || location.street.toLowerCase().includes(this.filter.searchText.toLowerCase())
      || location.country.toLowerCase().includes(this.filter.searchText.toLowerCase()));
    }
    if(this.filter.customer.length > 0){
      this.filteredLocations = this.locations.filter((location) => this.filter.customer.map(l => l.name).includes(location.customerName));
    }
    if(this.isFilterClear()){
      this.filteredLocations = this.locations;
    }
  };

  clearFilter = () => {
    this.filter = { searchText: '', customer: [] };
    this.filterLocations();
  };

  isFilterClear(): boolean {
    return this.filter.searchText == '' && this.filter.customer.length === 0;
  }
}
