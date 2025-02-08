import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';
import { UsersService } from '../../../users/users.service';
import { User } from '../../../users/user';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public showPassword: boolean = false;
  public titleForm: string = '';
  public subTitleForm: string = '';
  public leyendForm: string = '';
  public typeForm: string = 'login';
  public leyendBtn: string = 'Iniciar Sesión';
  public loginForm: FormGroup;
  public registerForm: FormGroup;


  constructor(private fb: FormBuilder, private _route: Router, private toastr: ToastrService, private _loginService: LoginService, private _appService: AppService) {
    this.loginForm = new FormGroup({
      // Campos del formulario de login
      usernameLogin: new FormControl('', Validators.required),
      passwordLogin: new FormControl('', [Validators.required]),
      rememberme: new FormControl(false),
    });

    this.registerForm = new FormGroup({
      // Campos del formulario de registro
      email: new FormControl('', [Validators.required, Validators.email]),
      usernameRegister: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      selectIdioma: new FormControl('', Validators.required),
      passwordRegister: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.changeDataForm('login');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  changeDataForm(typeForm: string) {
    if (typeForm == 'login') {
      this.typeForm = 'login';
      this.titleForm = 'Hola, Bienvenido de nuevo!';
      this.subTitleForm = 'Inicia sesión con:';
      this.leyendForm = 'O usa tu correo:';
      this.leyendBtn = 'Iniciar Sesión';
    }
    if (typeForm == 'register') {
      this.typeForm = 'register';
      this.titleForm = 'Hey, registrate para usar la app!';
      this.subTitleForm = 'Registrate con:';
      this.leyendForm = 'O usa tu correo para registrarte:';
      this.leyendBtn = 'Registrarse';
    }
  }

  manageForm() {
    switch (this.typeForm) {
      case 'login':
        this.onLogin();
        break;
      case 'register':
        this.onRegister();
        break;
      default:
        this.toastr.error(
          'Volviendo a login.',
          'Error interno.', { positionClass: 'toast-top-right' }
        );
        this._route.navigate(['/login']);
        break;
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      let newUser = {
        "usuario": this.registerForm.get('usernameRegister')?.value,
        "nombre": this.registerForm.get('name')?.value,
        "email": this.registerForm.get('email')?.value,
        "idioma": this.registerForm.get('selectIdioma')?.value,
        "habilitado": 0,
        "rol": 0,
        "password": this.registerForm.get('passwordRegister')?.value
      };

      this._loginService.register(newUser).subscribe({
        next: (response) => {
          if (response.success) { // esto debe ser true
            this.toastr.success(
              'Se ha solicitado el registro Correctamente',
              'Se ha solicitado el registro Correctamente, se debe esperar a que el admin acepte el registro!', { positionClass: 'toast-top-right' }
            );
            this.registerForm.setValue({
              email: '',
              usernameRegister: '',
              name: '',
              selectIdioma: '',
              passwordRegister: '',
            });
            this._route.navigate(['/login']);
          } else {
            this.toastr.error(
              'Error al solicitar el registro.',
              'Verifique las credenciales!', { positionClass: 'toast-top-right' }
            );
            console.log(response.message);

            this.registerForm.setValue({
              email: '',
              usernameRegister: '',
              name: '',
              selectIdioma: '',
              passwordRegister: '',
            });
            this._route.navigate(['/login']);
          }
        },
        error: (error) => {
          this.toastr.error(error, 'Error al registrarse.');
        },
        complete: () => {
          console.log('Operación completada.');
        },
      });
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Datos enviados:', this.loginForm.get('usernameLogin')?.value, this.loginForm.get('passwordLogin')?.value);

      let password = this.loginForm.get('passwordLogin')?.value;
      let username = this.loginForm.get('usernameLogin')?.value;

      // primero va la password y despues el username
      this._loginService.login(
        password, username
      ).subscribe({
        next: (response) => {
          if (response.success) { // esto debe ser true
            this._appService.setCurrentRol(username);
            this.toastr.success(
              'Se ha iniciado sesión Correctamente',
              'Se ha iniciado sesión Correctamente!', { positionClass: 'toast-top-right' }
            );
            this._route.navigate(['/home']);
          } else {
            this.toastr.error(
              'Error al iniciar sesión.',
              'Verifique las credenciales!', { positionClass: 'toast-top-right' }
            );
            console.log(response.message);
            this.loginForm.setValue({
              usernameLogin: '',
              passwordLogin: '',
              rememberme: false
            });
            this._route.navigate(['/login']);
          }
        },
        error: (error) => {
          this.toastr.error(error, 'Error al identificarse.');
        },
        complete: () => {
          console.log('Operación completada.');
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
