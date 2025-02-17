import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tripulante } from '../../tripulante';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { ToastrService } from 'ngx-toastr';
import { TransitosService } from '../../transitos.service';

@Component({
  selector: 'app-tripulantes',
  standalone: false,

  templateUrl: './tripulantes.component.html',
  styleUrl: './tripulantes.component.css'
})
export class TripulantesComponent {
  @ViewChild('tripulanteForm', { static: true }) tripulanteForm: NgForm | undefined;

  selectedFile: File | null = null;
  public title: string = "Tripulantes";
  public numeroDocumento: string = '';
  public option: string = '';
  public tituloConfirmacion: string = '';
  public formStatus: boolean = false;
  rol: number | null = null;
  public embarcacion: number = 0;
  public datosGlobales: any = [];



  public selectedTripulante: Tripulante = {
    tipoDocumento: 0,
    numeroDocumento: '',
    nombre: '',
    apellidos: '',
    nacionalidad: '',
    genero: 0,
    fechaNacimiento: new Date(),
    paisNacimiento: '',
    lugarNacimiento: '',
    fechaExpeDocumento: new Date(),
    fechaCadDocumento: new Date(),
    embarcacion: 0,
    documentoUrl: null
  };

  constructor(
    private _aroute: ActivatedRoute,
    private _route: Router,
    private _transitosService: TransitosService,
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
      this.numeroDocumento = params['numeroDocumento'];
      console.log('option: ' + this.option);
      console.log('numeroDocumento: ' + this.numeroDocumento);
      console.log('embarcacion: ' + params['embarcacion']);
    
      if (params['embarcacion'] == 'undefined') {
        this.embarcacion = 0;
      } else {
        this.embarcacion = params['embarcacion'];
      }
      this.tituloConfirmacion = this.createTitle(params['option']);

      if (this.numeroDocumento) {
        this.getSelectedTripulante(this.numeroDocumento);
      }
    });

    this._transitosService.getAllPaises().subscribe({
      next: (response) => {
        if (response.success) { // esto debe ser true
          this.datosGlobales = response.data;
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener el usuario');
      }
    });
  }

  createTitle(option: string) {
    switch (option) {
      case 'Insert':
        return "Insertando un nuevo tripulante en la embarcación - " + this.embarcacion;
      case 'Update':
        return "Actualizando al tripulante - " + this.numeroDocumento;
      case 'Delete':
        return "Eliminando al tripulante - " + this.numeroDocumento;
      default:
        return "";
    }
  }

  private getSelectedTripulante(numeroDocumento: string) {
    this._transitosService.getTripulante(numeroDocumento).subscribe({
      next: (response) => {
        if (response.success) { // esto debe ser true
          this.selectedTripulante = response.data[0];
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener el usuario');
      }
    });
  }

  manageForm(tripulanteForm: NgForm) {
    if (tripulanteForm.valid) {
      switch (this.option) {
        case 'Insert':
          this.insertNewTripulante();
          break;
        case 'Update':
          this.updateTripulante();
          break;
        case 'Delete':
          this.deleteTripulante();
          break;
        case 'Habilitar':
          this.updateTripulante();
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

  insertNewTripulante() {
    let formData = this.crearFormulario();
    //console.log('FormData' + formData);
    this._transitosService
      .insertNewTripulante(formData)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.toastr.success(
              'Se ha añadido a ' + this.selectedTripulante.nombre,
              'Tripulante agregado correctamente!', { positionClass: 'toast-top-right' }
            );
            setTimeout(() => {
              this._route.navigate(['/tripulantes', this.embarcacion]);
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

  updateTripulante() {
    let formData = this.crearFormulario();
    //console.log('FormData' + formData);

    this._transitosService
      .updateTripulante(this.numeroDocumento, formData)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.toastr.success(
              'Se ha actualizado a ' + this.selectedTripulante.nombre,
              'Tripulante actualizado correctamente!', { positionClass: 'toast-top-right' }
            );
            setTimeout(() => {
              this._route.navigate(['/tripulantes', this.embarcacion]);
            }, 500);
          } else {
            this.toastr.error(
              'Prueba modificar algún campo!',
              ' No se ha actualizado a ' + this.selectedTripulante.nombre, { positionClass: 'toast-top-right' }
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

  deleteTripulante() {
    this._transitosService
      .deleteTripulante(this.selectedTripulante.numeroDocumento)
      .subscribe({
        next: (response) => {
          if (response && response.success) {
            this.toastr.success(
              'Se ha eliminado a ' + this.selectedTripulante.nombre,
              'Tripulante actualizado correctamente!', { positionClass: 'toast-top-right' }
            );
            setTimeout(() => {
              this._route.navigate(['/tripulantes', this.embarcacion]);
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

  cancelForm(event: Event, embarcacion: any): void {
    event.preventDefault();
    if (embarcacion == 'undefined') {
      setTimeout(() => {
        this._route.navigate(['/tripulantes']);
      }, 500);
    } else {
      setTimeout(() => {
        this._route.navigate(['/tripulantes', this.embarcacion]);
      }, 500);
    }

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

  seleccionarDocumento(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = this.prepararDocumento(inputElement.files[0]);
      //console.log("Archivo seleccionado:", this.selectedFile);
    } else {
      //console.warn('No se seleccionó ningún archivo.');
    }
  }

  prepararDocumento(file: File) {
    let nombreFichero = file.name;
    let extension = nombreFichero.split('.').pop();
    let nuevoNombreFichero = 'tripulante_' + this.selectedTripulante.numeroDocumento + '.' + extension;
    let renamedFile = new File([file], nuevoNombreFichero, { type: file.type });
    //console.log('Nombre del fichero: ' + renamedFile.name);
    return renamedFile;
  }

  crearFormulario() {
    let formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
      //console.log("Archivo añadido al FormData: ", this.selectedFile);
    } else {
      //console.warn("No se seleccionó ningún archivo.");
    }
    formData.append('tripulante', JSON.stringify(this.selectedTripulante));
    //console.log("Tripulante añadido al FormData: ", this.selectedTripulante);
    //console.log("Datos a enviar:", formData);
    return formData;
  }

  comprobarFecha(fecha: any, tipoFecha: any): boolean {
    let fechaComprobar = new Date(fecha);
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0);  // Esto elimina la hora, minutos, segundos y milisegundos
    // Verificar si las fechas son válidas
    if (isNaN(fechaComprobar.getTime())) {
      this.toastr.error(
        'Error en la fecha ',
        '', { positionClass: 'toast-top-right' }
      ); return false;
    }

    switch (tipoFecha) {
      case 1: // Fecha de nacimiento
        if (fechaComprobar > hoy) {
          this.toastr.error(
            'Error en la fecha de nacimiento: ',
            'La fecha no puede ser posterior de hoy!', { positionClass: 'toast-top-right' }
          );
          return false;
        }
        break;
      case 2: // Fecha de expedición
        if (fechaComprobar > hoy) {
          this.toastr.error(
            'Error en la fecha de expedición: ',
            'La fecha no puede ser anterior de hoy!', { positionClass: 'toast-top-right' }
          );
          return false;
        }
        break;
      case 3: // Fecha de caducidad
        if (fechaComprobar < hoy) {
          this.toastr.error(
            'Error en la fecha de caducidad: ',
            'La fecha no puede ser anterior de hoy!', { positionClass: 'toast-top-right' }
          );
          return false;
        }
        break;
    }
    // si todo es correcto retornamos true
    return true;
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}
