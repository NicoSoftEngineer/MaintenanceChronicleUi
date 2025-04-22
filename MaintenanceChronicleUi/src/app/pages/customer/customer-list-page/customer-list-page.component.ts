
import { CustomerListDto } from './../../../models/bussiness/customer/customer-list-dto';
import { PopUpStateService } from './../../../components/pop-up-modal/pop-up-state.service';
import { Component, inject, NO_ERRORS_SCHEMA, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../../../components/alert/alert.component';
import { PopUpModalComponent } from '../../../components/pop-up-modal/pop-up-modal.component';
import { initFlowbite } from 'flowbite';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { CustomerService } from '../../../services/customer-service';
import { OffCanvasComponent } from '../../../components/off-canvas/off-canvas.component';
import { CustomerFilterDto } from '../../../models/bussiness/customer/customer-filter-dto';
import { FormInputComponent } from '../../../components/form-input/form-input.component';
import { ClickOutsideDirective } from '../../../utils/click-outside.directive';

@Component({
  selector: 'app-customer-list-page',
  imports: [RouterLink, AlertComponent, PopUpModalComponent, OffCanvasComponent, FormInputComponent, ClickOutsideDirective],
  templateUrl: './customer-list-page.component.html',
  styleUrl: './customer-list-page.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class CustomerListPageComponent implements OnInit, AfterViewInit {
  protected readonly customerService = inject(CustomerService);
  protected readonly popUpStateService = inject(PopUpStateService);
  protected readonly alertStateService = inject(AlertStateService);
  protected customers: CustomerListDto[] = [];
  protected filteredCustomers: CustomerListDto[] = [];
  dropdownOpenFor: string | null = null;
  protected filter: CustomerFilterDto = {
    searchText: ''
  };

  constructor() {
    this.loadCustomers();
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewChecked called');
    this.reinitializeDropdown();
  }
  ngOnInit(): void {
    this.reinitializeDropdown();
  }
  deleteCustomer = (id: string) => {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.customers = this.customers.filter((customer) => customer.id !== id);
    });
    this.loadCustomers();
    this.alertStateService.openAlert('Zákazník byl úspěšně vymazán', 'success');
  };
  openPopUp = (customer: CustomerListDto) => {
    this.popUpStateService.openPopUp(`Jste si jistí, že chcete vymazat zákazníka "${customer.name}"`, this.deleteCustomer, customer.id);
  };
  private loadCustomers = () => {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers
      this.filteredCustomers = customers
    });
    this.reinitializeDropdown();
  };

  drawerOpen = false;

  onSave() {
    // Handle save logic here.
    console.log('Save clicked!');
  }

  onClose() {
    // Handle additional close logic if needed.
    console.log('Drawer closed');
  }

  filterItems(){
    console.log(this.filter.searchText);
    if(this.filter.searchText){
      this.filteredCustomers = this.customers.filter((customer) =>
        customer.name.toLowerCase().includes(this.filter.searchText.toLowerCase()) ||
        customer.email.toLowerCase().includes(this.filter.searchText.toLowerCase()) ||
        customer.phoneNumber.toLowerCase().includes(this.filter.searchText.toLowerCase()) ||
        customer.companyIdNumber.toLowerCase().includes(this.filter.searchText.toLowerCase())
      );
      return;
    }
    this.filteredCustomers = this.customers;
    return;
  }

  reinitializeDropdown() {
    // setTimeout(() => {
      initFlowbite();
    // }, 100); // Delay to ensure the DOM updates
  }

  toggleDropdown(id: string): void {
    if (this.dropdownOpenFor === id) {
      this.dropdownOpenFor = null;
    } else {
      this.dropdownOpenFor = id;
    }
  }

  closeDropdown(): void {
    this.dropdownOpenFor = null;
  }

  clearFilter = () => {
    this.filter = { searchText: ''};
    this.filterItems();
  };

  isFilterClear(): boolean {
    return this.filter.searchText == '';
  }

}
