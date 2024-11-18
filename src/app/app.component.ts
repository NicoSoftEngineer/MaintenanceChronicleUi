import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TenantListComponent } from "./components/tenant-list/tenant-list.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TenantListComponent, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ServiceTrackUi';
}
