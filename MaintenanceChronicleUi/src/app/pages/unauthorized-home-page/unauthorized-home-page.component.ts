import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
    selector: 'app-unauthorized-home-page',
    imports: [RouterLink],
    templateUrl: './unauthorized-home-page.component.html',
    styleUrls: ['./unauthorized-home-page.component.scss']
})
export class UnauthorizedHomePageComponent implements OnInit {
    ngOnInit(): void {
      setTimeout(async () => {
        initFlowbite();
      }, 50);
    }
}
