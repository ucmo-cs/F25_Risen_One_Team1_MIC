import { Component, computed, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Month, Project, Selected } from '../../../model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timesheet-entry-container',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    CommonModule,
  ],
  templateUrl: './timesheet-entry-container.component.html',
  styleUrl: './timesheet-entry-container.component.css'
})

export class TimesheetEntryContainerComponent {
  months: Month[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  projects: Array<Project> = [
    { name: "TestProject1", id: 0 },
    { name: "TestProject2", id: 1, },
    { name: "TestProject3", id: 2 },
  ];

  selected: Selected = {
    project: this.projects[0],
    month: this.months[new Date().getMonth()],
    year: new Date().getFullYear(),
  }

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
