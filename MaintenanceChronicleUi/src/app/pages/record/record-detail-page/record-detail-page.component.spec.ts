import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDetailPageComponent } from './record-detail-page.component';

describe('RecordDetailPageComponent', () => {
  let component: RecordDetailPageComponent;
  let fixture: ComponentFixture<RecordDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
