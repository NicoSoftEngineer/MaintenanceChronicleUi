import { CustomerListDto } from './../../../models/bussiness/customer/customer-list-dto';
import { PopUpStateService } from './../../../components/pop-up-modal/pop-up-state.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../../../components/alert/alert.component';
import { PopUpModalComponent } from '../../../components/pop-up-modal/pop-up-modal.component';
import { initFlowbite } from 'flowbite';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { CustomerService } from '../../../services/customer-service';

@Component({
  selector: 'app-customer-list-page',
  imports: [RouterLink, AlertComponent, PopUpModalComponent],
  templateUrl: './customer-list-page.component.html',
  styleUrl: './customer-list-page.component.scss'
})
export class CustomerListPageComponent implements OnInit {
  protected readonly customerService = inject(CustomerService);
  protected readonly popUpStateService = inject(PopUpStateService);
  protected readonly alertStateService = inject(AlertStateService);
  protected customers: CustomerListDto[] = [];

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
    this.customerService.getCustomers().subscribe((customers) => {this.customers = customers});
  };
}
