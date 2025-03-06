import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordListPageComponent } from './record-list-page.component';

describe('RecordListPageComponent', () => {
  let component: RecordListPageComponent;
  let fixture: ComponentFixture<RecordListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
