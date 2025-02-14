import { CustomerListDto } from './../../../models/bussiness/customer/customer-list-dto';
import { PopUpStateService } from './../../../components/pop-up-modal/pop-up-state.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../../../components/alert/alert.component';
import { CustomerService } from '../../../../services/customer-service';
import { PopUpModalComponent } from '../../../components/pop-up-modal/pop-up-modal.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-customer-list-page',
  imports: [RouterLink, AlertComponent, PopUpModalComponent],
  templateUrl: './customer-list-page.component.html',
  styleUrl: './customer-list-page.component.scss'
})
export class CustomerListPageComponent implements OnInit {
  protected readonly customerService = inject(CustomerService);
  protected readonly popUpStateService = inject(PopUpStateService);
  protected customers: CustomerListDto[] = [];

  constructor() {
    this.customerService.getCustomers().subscribe((customers) => {this.customers = customers});
  }
  ngOnInit(): void {
    initFlowbite();
  }
  deleteCustomer = (id: string) => {
    console.log('Deleting customer with id: ', id);
  };
  openPopUp = (customer: CustomerListDto) => {
    this.popUpStateService.openPopUp(`Jste si jistí, že chcete vymazat zákazníka "${customer.name}"`, this.deleteCustomer, customer.id);

  };
}
