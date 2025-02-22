import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { TenantListComponent } from './components/tenant-list/tenant-list.component';
import { DefaultComponent } from './layout/default/default.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { UnauthorizedHomePageComponent } from './pages/unauthorized-home-page/unauthorized-home-page.component';
import { EmailConfirmPageComponent } from './pages/auth/email-confirm-page/email-confirm-page.component';
import { CustomerListPageComponent } from './pages/customer/customer-list-page/customer-list-page.component';
import { CustomerDetailPageComponent } from './pages/customer/customer-detail-page/customer-detail-page.component';
import { LocationListPageComponent } from './pages/location/location-list-page/location-list-page.component';
import { LocationDetailComponent } from './pages/location/location-detail/location-detail.component';

export const routes: Routes = [
    {
      path: '',
      component: DefaultComponent,
      children: [
        { path: '', component: UnauthorizedHomePageComponent, title: 'Home' },
        { path: 'tenants', component: TenantListComponent, title: 'Tenants' },
        { path: 'login', component: LoginPageComponent, title: 'Login' },
        { path: 'register', component: RegisterPageComponent, title: 'Register' },
        { path: 'auth/email-confirm/:email/:confirmToken', component: EmailConfirmPageComponent, title: 'Email confirmation' },
        { path: 'customer-list', component: CustomerListPageComponent, title: 'Customer list' },
        { path: 'customer-detail/:id', component: CustomerDetailPageComponent, title: 'Customer detail' },
        { path: 'locations', component: LocationListPageComponent, title: 'Location list' },
        { path: 'locations/:id', component: LocationDetailComponent, title: 'Location detail' },
      ]
    }
  ];
