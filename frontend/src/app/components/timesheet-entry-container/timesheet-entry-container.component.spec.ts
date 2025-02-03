import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetEntryContainerComponent } from './timesheet-entry-container.component';

describe('TimesheetEntryContainerComponent', () => {
  let component: TimesheetEntryContainerComponent;
  let fixture: ComponentFixture<TimesheetEntryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetEntryContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetEntryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
