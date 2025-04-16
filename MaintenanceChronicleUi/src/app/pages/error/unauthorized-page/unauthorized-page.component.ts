import { Component, inject } from '@angular/core';
import { TokenHelperService } from '../../../utils/token-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized-page',
  imports: [],
  templateUrl: './unauthorized-page.component.html',
  styleUrl: './unauthorized-page.component.scss'
})
export class UnauthorizedPageComponent {
  private tokenHelper = inject(TokenHelperService);
  private router = inject(Router);

  constructor() {
    const activeToken = this.tokenHelper.getActiveUser();
    if (activeToken) {
      console.log("redirecting back to login")
      this.router.navigate(['/login'], { queryParams: { email: activeToken.email, message: 'Vypršela Vám relace, prosím přihlašte se znovu' } });
    }
  }
}
