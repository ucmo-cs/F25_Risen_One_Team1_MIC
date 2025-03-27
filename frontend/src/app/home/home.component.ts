import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-form',
  providers: [provideNativeDateAdapter()],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  testProject1() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    // Navigate to Timesheet route
    this.router.navigate(['/timesheet'], {
      queryParams: { projectId: 0, year, month },
    });
  }
  testProject2() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    this.router.navigate(['/timesheet'], {
      queryParams: { projectId: 1, year, month },
    });
  }
  testProject3() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    this.router.navigate(['/timesheet'], {
      queryParams: { projectId: 2, year, month },
    });
  }

  ngOnInit() {}

  signIn() {
    this.router.navigate(['/login']);
  }
}
