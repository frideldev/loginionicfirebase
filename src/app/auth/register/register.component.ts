import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule,RouterLink]
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    updateOn: 'blur',
    validators: [this.createPasswordMatchValidator()]
  });

  loading = false;
  errorMessage = '';

  private createPasswordMatchValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      
      if (!password || !confirmPassword) return null;
      
      return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    };
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const { email, password } = this.registerForm.value;
      
      if (email && password) { // Type guard
        this.authService.register(email, password).subscribe({
          next: (response) => {
            console.log('Registro exitoso:', response);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Error en registro:', error);
            this.errorMessage = 'Error en el registro. Por favor, intente nuevamente.';
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
    }
  }
}