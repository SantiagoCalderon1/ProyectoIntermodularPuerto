import { Component, ViewChild } from '@angular/core';
import { cliente } from '../../cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../clientes.service';
import { AppService } from '../../../app.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: false,

  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  @ViewChild('clienteForm', { static: true }) clienteForm: NgForm | undefined;
  public nif: string = '';
  public option: string = '';
  public tituloConfirmacion: string = '';
  public formStatus: boolean = false;
  rol: number | null = null;

  public selectedCliente: cliente = {
    nif: '',
    nombre: '',
    apellidos: '',
    domicilio: '',
    codigoPostal: '',
    numeroBancario: '',
    telefono: '',
    email: ''
  };

  constructor(
    private _aroute: ActivatedRoute,
    private _route: Router,
    private _clientesService: ClientesService,
    private _appService: AppService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });

    this._aroute.params.subscribe(params => {
      this.option = params['option'];
      this.nif = params['nif'];

      this.tituloConfirmacion = this.createTitle(params['option']);

      if (this.nif) {
        this.getSelectedCliente(this.nif);
      }
    });
  }

  createTitle(option: string) {
    switch (option) {
      case 'Insert':
        return "Insertando un nuevo cliente. ";
      case 'Update':
        return "Actualizando al cliente - " + this.nif;
      case 'Delete':
        return "Eliminando al cliente - " + this.nif;
      default:
        return "";
    }
  }

  private getSelectedCliente(nif: string) {
    this._clientesService.getCliente(nif).subscribe({
      next: (response) => {
        if (response.success) { // esto debe ser true
          this.selectedCliente = response.data[0];
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener el cliente.');
      }
    });
  }

  manageForm(clienteForm: NgForm) {
    if (clienteForm.valid) {
      switch (this.option) {
        case 'Insert':
          this.insertNewClient();
          break;
        case 'Update':
          this.updateClient();
          break;
        case 'Delete':
          this.deleteClient();
          break;
      }
    } else {
      this.toastr.error(
        'El formulario tiene campos inválidos',
        'por favor complete todos los campos requeridos.'
      );
      //console.log("Formulario no válido, ");

    }
  }

  insertNewClient() {
    this._clientesService
      .insertNewCliente(this.selectedCliente)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.toastr.success(
              'Se ha añadido a ' + this.selectedCliente.nombre,
              'Cliente agregado correctamente!', { positionClass: 'toast-top-right' }
            );
            setTimeout(() => {
              this._route.navigate(['/clientes']);
            }, 500);
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

  updateClient() {
    this._clientesService
      .updateCliente(this.nif, this.selectedCliente)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.toastr.success(
              'Se ha actualizado a ' + this.selectedCliente.nombre,
              'Cliente actualizado correctamente!', { positionClass: 'toast-top-right' }
            );
            setTimeout(() => {
              this._route.navigate(['/clientes']);
            }, 500);
          } else {
            this.toastr.error(
              'Prueba modificar algún campo!',
              'No se ha actualizado a ' + this.selectedCliente.nombre, { positionClass: 'toast-top-right' }
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

  deleteClient() {
    this._clientesService
      .deleteCliente(this.selectedCliente.nif)
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            this.toastr.success(
              'Se ha eliminado a ' + this.selectedCliente.nombre,
              'Cliente actualizado correctamente!', { positionClass: 'toast-top-right' }
            );
            setTimeout(() => {
              this._route.navigate(['/clientes']);
            }, 500);
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
    event.preventDefault();
    setTimeout(() => {
      this._route.navigate(['/clientes']);
    }, 500);
  }

  changedForm(): void {
    this.formStatus = !this.formStatus;
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
