import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';

import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  providers: [provideNativeDateAdapter()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = ''; // Initialize with an empty string
  password: string = ''; // Initialize with an empty string
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open(error.error?.message || 'Login failed', 'OK', {
          duration: 5000,
        });
      },
    });
  }
}
