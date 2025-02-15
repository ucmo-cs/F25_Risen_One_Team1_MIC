import { Component } from '@angular/core';
import { TimesheetEntryContainerComponent } from '../timesheet-entry-container/timesheet-entry-container.component';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { Selected, Signature } from '../../../model';

@Component({
  selector: 'app-timesheet',
  standalone: true,
  imports: [
    TimesheetEntryContainerComponent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
  ],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.css'
})
export class TimesheetComponent {
  signature: Signature = {
    name: "",
    date: "",
  }
}
