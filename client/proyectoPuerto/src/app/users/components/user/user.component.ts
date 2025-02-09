import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../user';
import { NgForm } from '@angular/forms';
import { AppService } from '../../../app.service';
import { Rol } from '../../../roles/rol';
import { RolesService } from '../../../roles/roles.service';

@Component({
  selector: 'app-user',
  standalone: false,

  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @ViewChild('userForm', { static: true }) userForm: NgForm | undefined;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  public title: string = "Usuarios";
  public username: string = '';
  public option: string = '';
  public tituloConfirmacion: string = '';
  public formStatus: boolean = false;

  public roles: Rol[] = [];
  rol: number | null = null;

  public selectedUser: User = {
    usuario: '',
    nombre: '',
    email: '',
    password: '',
    idioma: '',
    habilitado: 0,
    rol: 0
  };


  constructor(
    private _aroute: ActivatedRoute,
    private _usersService: UsersService,
    private _appService: AppService,
    private listarolesService: RolesService,

    private _route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });

    this.listarolesService.obtengoRolesApi().subscribe({
      next: (resultado) => {
        this.roles = resultado.data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });

    this._aroute.params.subscribe(params => {
      this.username = params['username'];
      this.option = params['option'];
      this.tituloConfirmacion = this.createTitle(params['option']);
      if (this.username) {
        this.getSelectedUser(this.username);
      }
    });
  }

  createTitle(option: string) {
    switch (option) {
      case 'Insert':
        return "Insertando un nuevo usuario";
      case 'Update':
        return "Actualizando al usuario - " + this.username;
      case 'Delete':
        return "Eliminando al usuario - " + this.username;
      case 'Habilitar':
        return "Habilitando al usuario - " + this.username;
      default:
        return "";
    }
  }

  private getSelectedUser(username: string) {
    this._usersService.getUser(username).subscribe({
      next: (response) => {
        if (response.success) { // esto debe ser true
          this.selectedUser = response.data[0];
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener el usuario');
      }
    });
  }

  manageForm() {
    //console.log(this.selectedUser);
    switch (this.option) {
      case 'Insert':
        this.insertNewUser();
        break;
      case 'Update':
        this.updateUser();
        break;
      case 'Delete':
        this.deleteUser();
        break;
      case 'Habilitar':
        this.selectedUser.habilitado = 1;
        this.updateUser(); break;
      default:
        this.toastr.error(
          'El formulario tiene campos inválidos',
          'Error de validación'
        );
        this._route.navigate(['/users']);
        break;
    }
  }

  insertNewUser() {
    this._usersService
      .insertNewUser(this.selectedUser)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.toastr.success(
              'Se ha añadido a ' + this.selectedUser.nombre,
              'Ususario agregado correctamente!', { positionClass: 'toast-top-right' }
            );
            this.resetForm();
            this._route.navigate(['/users']);
          } else {
            this.toastr.error(
              response.message
            );
          }
        },
        error: (error) => {
          this.toastr.error(
            error.message
          );
        }
      });
  }

  generatePassword() {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '.!@#$%&*_-+=?';

    function getRandomChar(chars: string): string {
      return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    let password = '';
    for (let i = 0; i < 3; i++) {
      password += getRandomChar(letters);
      password += getRandomChar(numbers);
      password += getRandomChar(symbols);
    }

    // asi se mezclam los caracteres
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    this.selectedUser.password = password;
  }

  updateUser() {
    //console.log('username ' + this.username + ' user ' + JSON.stringify(this.selectedUser));
    this._usersService
      .updateUser(this.username, this.selectedUser)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.toastr.success(
              'Se ha actualizado a ' + this.selectedUser.nombre,
              'Usuario actualizado correctamente!', { positionClass: 'toast-top-right' }
            );
            this._route.navigate(['/users']);
          } else {
            this.toastr.error(
              response?.message
            );
          }
        },
        error: (error) => {
          this.toastr.error(
            error.message
          );
        }
      });
  }

  deleteUser() {
    this._usersService
      .deleteUser(this.selectedUser.usuario)
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            this.toastr.success(
              'Se ha eliminado a ' + this.selectedUser.nombre,
              'Usuario actualizado correctamente!', { positionClass: 'toast-top-right' }
            );
            this.resetForm();
            this._route.navigate(['/users']);
          } else {
            this.toastr.error(
              response.message
            );
          }
        },
        error: (error) => {
          this.toastr.error(
            error.message
          );
        }
      });
  }

  cancelForm(event: Event): void {
    this.resetForm();
    event.preventDefault();
    this._route.navigate(['/users'], { queryParams: {} });
  }

  changedForm(): void {
    this.formStatus = !this.formStatus;
    if (this.selectedUser.habilitado) {
      this.selectedUser.habilitado = 1;
    } else {
      this.selectedUser.habilitado = 0;
    }
  }

  resetForm(): void {
    Object.assign(this.selectedUser, {
      usuario: '',
      nombre: '',
      email: '',
      password: '',
      idioma: '',
      habilitado: 0,
      rol: 0
    });
    if (this.userForm) {
      this.userForm.resetForm();
    }
  }

  canDeactivateForm(): boolean {
    if (this.formStatus) {
      return confirm(
        'Tienes cambios sin registrar. ¿Estás seguro de que quieres salir?'
      );
    }
    return true;
  }
}
