import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Employee, EmployeeTimesheet, Month, Project, Selected } from '../../../model';
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

  daysInSelectedMonth: number = new Date(this.months.indexOf(this.selected.month), this.selected.year, 0).getDate();
  daysInSelectedMonthColumns = Array.from({ length: this.daysInSelectedMonth }, (_, i) => i + 1);

  data: Array<EmployeeTimesheet> = [
    {
      employee: { name: "TestEmployee1" },
      entries: [4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    },
    {
      employee: { name: "TestEmployee2" },
      entries: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    },
    {
      employee: { name: "TestEmployee3" },
      entries: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    },
  ]

  calculateEmployeeTotalColumn(row: EmployeeTimesheet): number {
    const clippedEntries = row.entries.slice(0, this.daysInSelectedMonth)
    return clippedEntries.reduce((total, cell) => total + cell);
  }

  calculateGrandTotalColumn() {
    let grandTotal = 0;
    this.data.forEach(timesheet => grandTotal += this.calculateEmployeeTotalColumn(timesheet));
    return grandTotal;
  }

  onMonthChange(month: Month) {
    this.selected.month = month;
    this.daysInSelectedMonth = new Date(this.months.indexOf(this.selected.month), this.selected.year, 0).getDate();
    this.daysInSelectedMonthColumns = Array.from({ length: this.daysInSelectedMonth }, (_, i) => i + 1);
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
