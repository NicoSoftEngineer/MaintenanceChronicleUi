import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TenantListComponent } from './components/tenant-list/tenant-list.component';
import { DefaultComponent } from './layout/default/default.component';

export const routes: Routes = [
    {
      path: '',
      component: DefaultComponent,
      children: [
        { path: '', component: TenantListComponent, title: 'Tenants' },
        { path: 'login', component: LoginPageComponent, title: 'Login' },
      ],
    }
  ];
