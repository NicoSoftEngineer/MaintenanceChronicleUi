import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TenantService } from '../../services/tenant/tenant-service';


@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './tenant-list.component.html',
  styleUrl: './tenant-list.component.scss'
})
export class TenantListComponent {
  protected formular;
  protected tenants$;

  constructor(formBuilder: FormBuilder, protected ts: TenantService) {
    this.formular = formBuilder.group({
      content: new FormControl('',{nonNullable: true, validators: [Validators.required]})
    });
    this.tenants$ = this.ts.getTenants();
  }
}
