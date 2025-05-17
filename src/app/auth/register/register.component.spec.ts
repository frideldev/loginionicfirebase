import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        RegisterComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test 1: Password Match Validator
  it('should validate password match correctly', () => {
    const form = component.registerForm;
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    // Set different passwords
    password?.setValue('password123');
    confirmPassword?.setValue('different123');
    expect(form.hasError('passwordMismatch')).toBeTruthy();

    // Set matching passwords
    confirmPassword?.setValue('password123');
    expect(form.hasError('passwordMismatch')).toBeFalsy();
  });

  // Test 2: Form Submission
  it('should handle form submission correctly', fakeAsync(() => {
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    // Setup successful registration
    authServiceSpy.register.and.returnValue(of({
      user: { email: testUser.email } as any,
      providerId: 'mockProviderId',
      operationType: 'signIn'
    }));

    // Fill in the form
    component.registerForm.patchValue(testUser);
    expect(component.registerForm.valid).toBeTruthy();

    // Submit form
    component.onSubmit();
    tick();

    // Verify service was called
    expect(authServiceSpy.register).toHaveBeenCalledWith(
      testUser.email,
      testUser.password
    );

    // Verify navigation
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);

    // Verify loading state
    expect(component.loading).toBeFalsy();
    expect(component.errorMessage).toBe('');
  }));
});