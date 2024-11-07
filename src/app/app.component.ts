import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TenantListComponent } from "./tenant-list/tenant-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TenantListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ServiceTrackUi';
}
