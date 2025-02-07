import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmPageComponent } from './email-confirm-page.component';

describe('EmailConfirmPageComponent', () => {
  let component: EmailConfirmPageComponent;
  let fixture: ComponentFixture<EmailConfirmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailConfirmPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailConfirmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
