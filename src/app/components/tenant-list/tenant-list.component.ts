import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TenantService } from '../../../services/tenant/tenant-service';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-tenant-list',
    standalone: true,
    imports: [
        CommonModule,
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './tenant-list.component.html',
    styleUrl: './tenant-list.component.scss'
})
export class TenantListComponent {protected readonly fb = inject(FormBuilder);
  protected readonly tenantService = inject(TenantService);

  protected formular = this.fb.group({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected tenants$ = this.tenantService.getTenants();

  showForm: boolean = false;

  onSubmit(): void {
    const dataRaw = this.formular.getRawValue();

    const data = JSON.parse(JSON.stringify(dataRaw));

    this.tenantService.createTenant(data).subscribe({
      next: () => {
        this.refreshData();
        this.closeForm();
      },
    });
  }

  closeForm() {
    this.showForm = false;
    this.formular.reset();
  }

  refreshData() {
    this.tenants$ = this.tenantService.getTenants();
  }
}
