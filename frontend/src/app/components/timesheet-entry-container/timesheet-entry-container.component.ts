import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-timesheet-entry-container',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
  ],
  templateUrl: './timesheet-entry-container.component.html',
  styleUrl: './timesheet-entry-container.component.css'
})

export class TimesheetEntryContainerComponent {
  projectName: string = "";
  selectedMonth: Date = new Date();

  exportToPDF() {
    alert("TODO export to pdf")
  }


  edit() {
    alert("TODO edit")
  }

  save() {
    alert("TODO save")
  }
}
