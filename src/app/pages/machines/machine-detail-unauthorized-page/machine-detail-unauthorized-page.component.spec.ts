import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailUnauthorizedPageComponent } from './machine-detail-unauthorized-page.component';

describe('MachineDetailUnauthorizedPageComponent', () => {
  let component: MachineDetailUnauthorizedPageComponent;
  let fixture: ComponentFixture<MachineDetailUnauthorizedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineDetailUnauthorizedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineDetailUnauthorizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
