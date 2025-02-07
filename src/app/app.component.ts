import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { TenantListComponent } from "./components/tenant-list/tenant-list.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ServiceTrackUi';
}
