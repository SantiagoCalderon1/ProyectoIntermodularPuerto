import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; import { LoginService } from '../../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  verifyUser() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Datos enviados:', username, password);

      // Llamar al servicio de autenticación
      this.loginService.login(username, password).subscribe(
        (response) => {
          console.log('Login exitoso', response);
          this.router.navigate(['/home']); 
        },
        (error) => {
          console.error('Error en login', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
