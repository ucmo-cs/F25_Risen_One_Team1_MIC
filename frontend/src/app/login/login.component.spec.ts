import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AppModule } from '../app.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render form', () => {
    const heading = document.getElementsByClassName('login-heading').item(0);
    expect(heading).not.toBeNull();
    expect(heading!.textContent).toBe('Login');
  });

  it('Should have disabled login button at first', () => {
    const loginBtn = (fixture.nativeElement as HTMLElement).querySelector(
      'button'
    ) as HTMLButtonElement;
    expect(loginBtn.textContent).toBe('Login');
    console.log(loginBtn);
    expect(loginBtn.disabled).toBeTrue();
  });

  it('Should login', () => {
    const usernameField = document.getElementById(
      'username'
    ) as HTMLInputElement;
    const passwordField = document.getElementById(
      'password'
    ) as HTMLInputElement;
    expect(usernameField).not.toBeNull();
    expect(passwordField).not.toBeNull();

    usernameField.value = 'admin';
    usernameField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.username).toBe('admin');

    passwordField.value = 'password';
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.password).toBe('password');

    const loginBtn = (fixture.nativeElement as HTMLElement).querySelector(
      'button'
    ) as HTMLButtonElement;
    expect(loginBtn.disabled).toBeFalse();

    loginBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.isLoading).toBeTrue();
    expect(loginBtn.disabled).toBeTrue();
  });
});
