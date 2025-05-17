import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear', () => {
    expect(component).toBeTruthy();
  });

  it('Debe funcionar correctamente el formulario login', () => {
    const form = component.loginForm;
    expect(form.valid).toBeFalsy();

    // Test Validacion email
    const emailControl = form.controls['email'];
    emailControl.setValue('invalid-email');
    expect(emailControl.valid).toBeFalsy();
    expect(emailControl.errors?.['email']).toBeTruthy();

    emailControl.setValue('valid@email.com');
    expect(emailControl.valid).toBeTruthy();

    // Test Validacion password
    const passwordControl = form.controls['password'];
    passwordControl.setValue('123');
    expect(passwordControl.valid).toBeFalsy();
    expect(passwordControl.errors?.['minlength']).toBeTruthy();

    passwordControl.setValue('123456');
    expect(passwordControl.valid).toBeTruthy();

    expect(form.valid).toBeTruthy();
  });

  it('deberia gestionar correctamente los mensajes de error', () => {
    const testCredentials = {
      email: 'test@example.com',
      password: '123456'
    };

    component.loginForm.setValue(testCredentials);

    // Test Login Correcto
    authServiceSpy.login.and.returnValue(of({
      user: { email: 'test@example.com', uid: '123' } as any,
      providerId: 'provider-id',
      operationType: 'signIn'
    }));
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(
      testCredentials.email, 
      testCredentials.password
    );
    expect(component.loading).toBeFalsy();
    expect(component.errorMessage).toBe('');

    // Test Login Error
    const errorMessage = 'Credenciales Invalidas';
    authServiceSpy.login.and.returnValue(throwError(() => new Error(errorMessage)));
    component.onSubmit();

    expect(component.loading).toBeFalsy();
    expect(component.errorMessage).toContain('Error en la autenticación');
  });
});