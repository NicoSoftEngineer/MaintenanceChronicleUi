import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { DefaultComponent } from './layout/default/default.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { UnauthorizedHomePageComponent } from './pages/unauthorized-home-page/unauthorized-home-page.component';
import { EmailConfirmPageComponent } from './pages/auth/email-confirm-page/email-confirm-page.component';
import { CustomerListPageComponent } from './pages/customer/customer-list-page/customer-list-page.component';
import { CustomerDetailPageComponent } from './pages/customer/customer-detail-page/customer-detail-page.component';
import { LocationListPageComponent } from './pages/location/location-list-page/location-list-page.component';
import { LocationDetailComponent } from './pages/location/location-detail/location-detail.component';
import { UserListPageComponent } from './pages/user/user-list-page/user-list-page.component';
import { AdminRoleGuard } from './utils/admin-role-guard';
import { UserDetailPageComponent } from './pages/user/user-detail-page/user-detail-page.component';
import { MachineListPageComponent } from './pages/machines/machine-list-page/machine-list-page.component';
import { MachineDetailPageComponent } from './pages/machines/machine-detail-page/machine-detail-page.component';

export const routes: Routes = [
    {
      path: '',
      component: DefaultComponent,
      children: [
        { path: '', component: UnauthorizedHomePageComponent, title: 'Home' },
        { path: 'login', component: LoginPageComponent, title: 'Login' },
        { path: 'register', component: RegisterPageComponent, title: 'Register' },
        { path: 'auth/email-confirm/:email/:confirmToken', component: EmailConfirmPageComponent, title: 'Email confirmation' },
        { path: 'customers', component: CustomerListPageComponent, title: 'Customer list' },
        { path: 'customers/:id', component: CustomerDetailPageComponent, title: 'Customer detail' },
        { path: 'locations', component: LocationListPageComponent, title: 'Location list' },
        { path: 'locations/:id', component: LocationDetailComponent, title: 'Location detail' },
        { path: 'users', component: UserListPageComponent, title: 'User list'/*, canActivate: [AdminRoleGuard]*/ },
        { path: 'users/:id', component: UserDetailPageComponent, title: 'User detail'/*, canActivate: [AdminRoleGuard]*/},
        { path: 'machines', component: MachineListPageComponent, title: 'Machine list' },
        { path: 'machines/:id', component: MachineDetailPageComponent, title: 'Machine Detail' },
      ]
    }
  ];
