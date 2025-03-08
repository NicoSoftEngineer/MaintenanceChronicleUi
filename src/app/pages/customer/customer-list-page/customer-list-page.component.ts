import { CustomerListDto } from './../../../models/bussiness/customer/customer-list-dto';
import { PopUpStateService } from './../../../components/pop-up-modal/pop-up-state.service';
import { Component, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../../../components/alert/alert.component';
import { PopUpModalComponent } from '../../../components/pop-up-modal/pop-up-modal.component';
import { initFlowbite } from 'flowbite';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { CustomerService } from '../../../services/customer-service';
import { OffCanvasComponent } from '../../../components/off-canvas/off-canvas.component';
import { CustomerFilterDto } from '../../../models/bussiness/customer/customer-filter-dto';
import { FormInputComponent } from '../../../components/form-input/form-input.component';

@Component({
  selector: 'app-customer-list-page',
  imports: [RouterLink, AlertComponent, PopUpModalComponent, OffCanvasComponent, FormInputComponent],
  templateUrl: './customer-list-page.component.html',
  styleUrl: './customer-list-page.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class CustomerListPageComponent implements OnInit {
  protected readonly customerService = inject(CustomerService);
  protected readonly popUpStateService = inject(PopUpStateService);
  protected readonly alertStateService = inject(AlertStateService);
  protected customers: CustomerListDto[] = [];
  protected filteredCustomers: CustomerListDto[] = [];
  protected filter: CustomerFilterDto = {
    searchText: ''
  };

  constructor() {
    this.loadCustomers();
  }
  ngOnInit(): void {
    initFlowbite();
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
}
