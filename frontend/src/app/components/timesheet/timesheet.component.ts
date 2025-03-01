import { Component } from '@angular/core';
import { TimesheetEntryContainerComponent } from '../timesheet-entry-container/timesheet-entry-container.component';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
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
  styleUrl: './timesheet.component.css',
})
export class TimesheetComponent {
  signature: Signature = {
    name: '',
    date: '',
  };
}

/**
{
  projectName: "Test",
  years: [
    {
      year: 2024,
      months: [
        {
          month: 0,
          employees: [
            {
              id: 4,
              hours: [4, 4, 4, 4, 6, 5, 4, 0]
            }
          ]
        }
      ]
    }  
  ]
} 
 */
