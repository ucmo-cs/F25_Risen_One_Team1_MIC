import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { AppModule } from '../app.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [LoginComponent],
      providers: [provideHttpClientTesting(), LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
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
    fixture.detectChanges();

    const loginBtn = (fixture.nativeElement as HTMLElement).querySelector(
      'button'
    ) as HTMLButtonElement;

    expect(loginBtn.textContent).toBe('Login');
    expect(loginBtn.disabled).toBeTrue();
  });

  it('Should mock login', () => {
    const username = 'test.User!';
    const password = '!#passw0Rd-';

    const usernameField = document.getElementById(
      'username'
    ) as HTMLInputElement;
    const passwordField = document.getElementById(
      'password'
    ) as HTMLInputElement;
    expect(usernameField).not.toBeNull();
    expect(passwordField).not.toBeNull();

    usernameField.value = username;
    usernameField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.username).toBe(username);

    passwordField.value = password;
    passwordField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.password).toBe(password);

    const loginBtn = (fixture.nativeElement as HTMLElement).querySelector(
      'button'
    ) as HTMLButtonElement;
    expect(loginBtn.disabled).toBeFalse();

    loginBtn.click();
    fixture.detectChanges();

    expect(component.isLoading).toBeTrue();
    expect(loginBtn.disabled).toBeTrue();

    const req = httpMock.expectOne(
      (req) => req.url.includes('/dev/login') && req.method === 'POST'
    );

    expect(req.request.body).toEqual({ username, password });
    req.flush({ message: 'Login successful' });

    fixture.detectChanges();
    expect(component.isLoading).toBeFalse();
  });
});
