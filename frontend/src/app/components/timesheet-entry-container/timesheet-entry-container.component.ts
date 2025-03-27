import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Selected, User } from '../../../model';
import { CommonModule } from '@angular/common';
import { UserApiService } from '../../services/user.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { Project } from '@shared/types';
import { ProjectService } from '../../services/project.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

interface EmployeeRow {
  username: string;
  hours: number[];
}

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
    FormsModule,
    ReactiveFormsModule,
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

  projects: Project[] = [];
  currentYear = new Date().getFullYear();
  users: User[] = [];
  selected: Selected = null!;
  isLoading = true;
  isEditing = false;

  constructor(
    private userService: UserApiService,
    private projectsService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const projectId = +params['projectId'];
      const year = +params['year'];
      const month = +params['month'];

      // If these are present & valid, call changeTimesheet
      if (!isNaN(projectId) && !isNaN(year) && !isNaN(month)) {
        // Do NOT call this.changeTimesheet(0, year, month) from anywhere else
        // if you want to rely on the user’s param.
        this.changeTimesheet(projectId, year, month);
      } else {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        this.changeTimesheet(0, year, month);
      }
    });

    forkJoin([
      this.userService.getUsers(),
      this.projectsService.getProjects(),
    ]).subscribe((r) => {
      this.users = r[0] as unknown as User[];
      this.projects = r[1 as 0] as unknown as Project[];
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
    return this.employees.reduce(
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

    const proj = this.selectedProject;
    if (proj && !proj.years[year]) proj.years[year] = {};

    if (proj && !proj.years[year][month]) proj.years[year][month] = [];
  }

  get selectedProject(): Project | undefined {
    return this.projects.find((p) => p.id === this.selected.projectId);
  }

  get employees(): EmployeeRow[] {
    if (!this.selectedProject) return [];

    return (
      this.selectedProject.years[this.selected.year]?.[this.selected.month] ||
      []
    );
  }

  employeeHours(username: string): number[] {
    return (
      this.employees.find((e) => e.username === username)?.hours ||
      Array.from({ length: this.selected.dayColumns.length }, () => -1)
    );
  }

  trackByUsername(index: number, user: User): string {
    return user.username;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  updateHours(username: string, dayIndex: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const hours = this.employeeHours(username);

    let newValue = Number(input.value || '?');
    if (isNaN(newValue) || newValue < 0) newValue = -1;

    input.value = newValue < 0 ? '' : String(newValue);

    hours[dayIndex] = newValue;

    if (!this.employees.some((e) => e.username === username))
      this.employees.push({ username, hours });
  }

  onKeyDown(event: KeyboardEvent, rowIndex: number, colIndex: number) {
    if (event.shiftKey) return;

    const input = event.target as HTMLInputElement;
    const cursorAtLeft = input.selectionStart === 0;
    const cursorAtRight = input.selectionEnd === input.value.length;

    let nextInput: HTMLElement | null = null;

    switch (event.key) {
      case 'ArrowUp':
        if (cursorAtLeft || cursorAtRight)
          nextInput = this.getInputElement(rowIndex - 1, colIndex);
        break;
      case 'ArrowDown':
        if (cursorAtLeft || cursorAtRight)
          nextInput = this.getInputElement(rowIndex + 1, colIndex);
        break;
      case 'ArrowLeft':
        if (cursorAtLeft)
          nextInput = this.getInputElement(rowIndex, colIndex - 1);
        break;
      case 'ArrowRight':
        if (cursorAtRight)
          nextInput = this.getInputElement(rowIndex, colIndex + 1);
        break;
    }

    if (nextInput) {
      event.preventDefault();
      nextInput.focus();
    }
  }

  getInputElement(rowIndex: number, colIndex: number): HTMLElement | null {
    const table = document.querySelector('table tbody');
    if (!table) return null;

    const row = table.children[rowIndex] as HTMLElement;
    const cell = row?.children[colIndex + 1] as HTMLElement;
    return cell?.querySelector('input') || null;
  }

  exportToPDF() {
    alert('TODO export to pdf');
  }

  edit() {
    this.isEditing = !this.isEditing;

    // Save
    if (!this.isEditing) {
      this.isLoading = true;
      this.projectsService.updateProjects(this.projects).subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: (e) => {
          console.error(e);
          this.isLoading = false;
        },
      });
    }
  }
}
