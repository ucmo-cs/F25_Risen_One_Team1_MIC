import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Project, Selected, Timesheet, User } from '../../../model';
import { CommonModule } from '@angular/common';
import { UserApiService } from '../../services/user.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-timesheet-entry-container',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    MatProgressSpinner,
    CommonModule,
  ],
  templateUrl: './timesheet-entry-container.component.html',
  styleUrl: './timesheet-entry-container.component.css',
})
export class TimesheetEntryContainerComponent implements OnInit {
  MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  projects: Project[] = [
    {
      id: 0,
      name: 'TestProject1',
      years: {
        2025: {
          2: {
            employees: [
              {
                username: 'admin',
                hours: [2, 4, 5, 0, 1, 22],
              },
            ],
          },
        },
      },
    },
    { id: 1, name: 'TestProject2', years: {} },
    { id: 2, name: 'TestProject3', years: {} },
  ];

  users: User[] = [];
  selected: Selected = null!;
  selectedTimesheet: Timesheet | null = null;
  isLoading = true;

  constructor(private userService: UserApiService) {}

  ngOnInit() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    this.changeTimesheet(0, year, month);

    this.userService.getUsers().subscribe((res) => {
      this.users = res;
      this.isLoading = false;
    });
  }

  calculateEmployeeTotalColumn(hours: number[]): number {
    return hours.reduce((acc, v) => {
      if (v < 0) return acc;
      acc += v;
      return acc;
    }, 0);
  }

  calculateGrandTotalColumn() {
    if (!this.selectedTimesheet) return 0;

    return this.selectedTimesheet.employees.reduce(
      (acc, v) => (acc += this.calculateEmployeeTotalColumn(v.hours)),
      0
    );
  }

  changeTimesheet(projectId: number, year: number, month: number) {
    const newDayCount = new Date(year, month + 1, 0).getDate();
    const newDayColumns = Array.from({ length: newDayCount }, (_, i) => i + 1);

    this.selected = {
      projectId,
      year,
      month,
      dayColumns: newDayColumns,
    };
    this.selectedTimesheet =
      this.projects.find((p) => p.id === projectId)?.years[year]?.[month] ||
      null;
  }

  getEmployeeHours(username: string): number[] {
    const entry = this.selectedTimesheet?.employees.find(
      (e) => e.username === username
    );
    const arr: number[] = Array.from({
      length: this.selected.dayColumns.length,
    });
    arr.fill(-1);

    entry?.hours.forEach((h, i) => (arr[i] = h));

    return arr;
  }

  exportToPDF() {
    alert('TODO export to pdf');
  }

  edit() {
    alert('TODO edit');
  }

  save() {
    alert('TODO save');
  }
}
