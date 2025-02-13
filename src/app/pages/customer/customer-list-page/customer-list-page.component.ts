import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../../../components/alert/alert.component';
import { CustomerService } from '../../../../services/customer-service';
import { CustomerListDto } from '../../../models/bussiness/customer/customer-list-dto';

@Component({
  selector: 'app-customer-list-page',
  imports: [RouterLink, AlertComponent],
  templateUrl: './customer-list-page.component.html',
  styleUrl: './customer-list-page.component.scss'
})
export class CustomerListPageComponent {
  protected readonly customerService = inject(CustomerService);
  protected customers: CustomerListDto[] = [];

  constructor() {
    this.customerService.getCustomers().subscribe((customers) => {this.customers = customers});
  }
}
