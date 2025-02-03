import { Component } from '@angular/core';
import { TimesheetEntryContainerComponent } from '../timesheet-entry-container/timesheet-entry-container.component';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-timesheet',
  standalone: true,
  imports: [
    TimesheetEntryContainerComponent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
  ],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.css'
})
export class TimesheetComponent {

}
