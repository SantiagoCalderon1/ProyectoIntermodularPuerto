import { Component, ViewChild } from '@angular/core';
import { Embarcacion, Plaza, Reserva, Titular } from '../../plazas';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasService } from '../../reservas.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../app.service';
import { PlazasService } from '../../plazas.service';

@Component({
  selector: 'app-reservas',
  standalone: false,

  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservaComponent {
  titulo: string = "Registrar Reserva";
  txtBtn: string = "Guardar";
  public formularioCambiado: boolean = false;
  public id_reserva: number = 0;
  public tipo: number = 0;
  public titulares: any[] = [];
  public titActual: any[] = [];
  public datosTitular: string = "Titular no seleccionado";

  public embarcaciones: any[] = [];
  public embActual: any[] = [];
  public datosEmbarcacion: string = "Embarcacion no seleccionada";

  rol: number | null = null;
  @ViewChild('reservaForm', { static: false }) reservaForm: NgForm | undefined;

  reservaact: Reserva = new Reserva(
    0, // id_reserva
    0, // plaza
    '', // fecha_inicio
    '', // fecha_fin
    new Titular(0, '', '', '', 0, '', '', '', 0, 0, '', '', '', '', '', 0, 0, ''), // Titular vacío
    new Embarcacion(0, '', 0, 0, 0, '', '', '', 0) // Embarcación vacía
  );
  public plazaact: Plaza = { id_plaza_base: 0, nombre: '', instalacion: ''};
  public plazas: any[] = [];
  provincia: any[] = [];

  constructor(private _aroute: ActivatedRoute, private _plazasService: PlazasService, private _reservasService: ReservasService, private _route: Router, private toastr: ToastrService, private _appService: AppService) { }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id_reserva = +this._aroute.snapshot.params['id_plaza_base'];
    this.titulares = [];
    this.traeTitulares();
    this.traeEmbarcaciones();
    this.traePlazas();

    if (this.tipo == 1 || this.tipo == 2) {
      this.traeReserva(this.id_reserva);
    }
  }

  private traePlazas() {
    this._plazasService.obtengoPlazasApi().subscribe({
      next: (resultado) => {
        this.plazas = resultado;
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener la plaza');
      },
      complete: () => {
        console.log('Operación completada.');
      }
    });
  }

  private traeReserva(id_reserva: number) {
    this._reservasService.obtengoReservaApi(id_reserva).subscribe({
      next: (resultado) => {
        this.reservaact = resultado[0];
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener la plaza');
      },
      complete: () => {
        console.log('Operación completada.');
      }
    });
  }

  private traeTitulares() {
    this._reservasService.obtengoTitularesApi().subscribe({
      next: (resultado) => {
        this.titulares = resultado
      },
      error: () => this.toastr.error('Error')
    });
  }

  actualizaTitularActual() {
    this.titActual[0] = this.reservaact.titular
  }

  actualizaTitular() {
    let id = 0;
    if (!this.titActual || this.titActual.length === 0 || !this.titActual[0]?.id_titular) {
      this.datosTitular = "Titular no seleccionado";
    } else {
      id = this.titActual[0]["id_titular"];
      this._reservasService.obtengoTitularApi(id).subscribe({
        next: (resultado) => {
          this.datosTitular = resultado[0]["tipo_doc"] + ": " + resultado[0]["numero_doc"] + "-" + resultado[0]["letra"];
        },
        error: () => this.toastr.error('Error')
      });
    }
  }

  traeEmbarcaciones() {
    this._reservasService.obtengoEmbarcacionesApi().subscribe({
      next: (resultado) => {
        this.embarcaciones = resultado
      },
      error: () => this.toastr.error('Error')
    });
  }

  actualizaEmbarcacionActual() {
    this.embActual[0] = this.reservaact.embarcacion
    console.log(this.embActual);
  }

  actualizaEmbarcacion() {
    let id = 0;
    if (!this.embActual || this.embActual.length === 0 || !this.embActual[0]?.id_embarcacion) {
      this.datosEmbarcacion = "Embarcacion no seleccionada";
    } else {
      id = this.embActual[0]["id_embarcacion"];
      this._reservasService.obtengoEmbarcacionApi(id).subscribe({
        next: (resultado) => {
          this.datosEmbarcacion = resultado[0]["matricula"]
          console.log(this.datosEmbarcacion);
        },
        error: () => this.toastr.error('Error')
      });
    }
  }

  traeEmbarcacionTitular() {
    let id = 0;
    if (!this.titActual || this.titActual.length === 0 || !this.titActual[0]?.id_titular) {
      this.embarcaciones[0] = "Titular no seleccionado";
      this.embActual[0] = "";
    } else {
      id = this.titActual[0]["id_titular"];
      this._reservasService.obtengoEmbarcacionTitularApi(id).subscribe({
        next: (resultado) => {
          this.embarcaciones = resultado
          console.log(this.embarcaciones);
        },
        error: () => this.toastr.error('Error')
      });
    }
  }

  /* guardaReserva(): void {
    if (this.reservaForm!.valid || this.tipo == 2) {
      this.formularioCambiado = false;

      if (this.tipo == 0) {
        this._reservasService.guardaNuevaReservaApi(this.reservaact).subscribe({
          next: (resultado) => {
            if (resultado == "OK") {
              this.toastr.success('Plaza agregada correctamente!');
              this._route.navigate(['/listaPlazas']);
            } else {
              this.toastr.error('Error guardando plaza');
            }
          },
          error: () => this.toastr.error('Error guardando plaza'),
          complete: () => console.log('Operación completada.')
        });
      } else if (this.tipo == 1) {
        this._reservasService.modificaReservaApi(this.id_reserva, this.reservaact).subscribe({
          next: (resultado) => {
            if (resultado == "OK") {
              this.toastr.success('Plaza modificada correctamente!');
              this._route.navigate(['/listaPlazas']);
            } else {
              this.toastr.error('Error modificando plaza');
            }
          },
          error: () => this.toastr.error('Error modificando plaza'),
          complete: () => console.log('Operación completada.')
        });
      } else if (this.tipo == 2) {
        this._reservasService.borraReservaApi(this.id_reserva).subscribe({
          next: (resultado) => {
            if (resultado == "OK") {
              this.toastr.success('Plaza eliminada correctamente!');
              this._route.navigate(['/listaPlazas']);
            } else {
              this.toastr.error('Error eliminando plaza');
            }
          },
          error: () => this.toastr.error('Error eliminando plaza'),
          complete: () => console.log('Operación completada.')
        });
      }
    } else {
      this.toastr.error("El formulario tiene campos inválidos", 'Error de validación');
    }
  } */

  guardaReserva(): void {
    if (this.reservaForm?.valid || this.tipo === 2) {
      this.formularioCambiado = false;
      console.log("Guardando reserva...", this.reservaact);
  
      if (this.tipo === 0) { // Crear nueva reserva
        this._reservasService.guardaNuevaReservaApi(this.reservaact).subscribe({
          next: (resultado) => {
            if (resultado === "OK") {
              this.toastr.success('Reserva agregada correctamente!');
              this._route.navigate(['/listaPlazas']);
            } else {
              this.toastr.error('Error guardando la reserva');
            }
          },
          error: (error) => {
            this.toastr.error('Error guardando la reserva');
            console.error(error);
          },
          complete: () => console.log('Operación completada.')
        });
  
      } else if (this.tipo === 1) { // Modificar reserva existente
        this._reservasService.modificaReservaApi(this.id_reserva, this.reservaact).subscribe({
          next: (resultado) => {
            if (resultado === "OK") {
              this.toastr.success('Reserva modificada correctamente!');
              this._route.navigate(['/listaPlazas']);
            } else {
              this.toastr.error('Error modificando la reserva');
            }
          },
          error: (error) => {
            this.toastr.error('Error modificando la reserva');
            console.error(error);
          },
          complete: () => console.log('Operación completada.')
        });
  
      } else if (this.tipo === 2) { // Eliminar reserva
        this._reservasService.borraReservaApi(this.id_reserva).subscribe({
          next: (resultado) => {
            if (resultado === "OK") {
              this.toastr.success('Reserva eliminada correctamente!');
              this._route.navigate(['/listaPlazas']);
            } else {
              this.toastr.error('Error eliminando la reserva');
            }
          },
          error: (error) => {
            this.toastr.error('Error eliminando la reserva');
            console.error(error);
          },
          complete: () => console.log('Operación completada.')
        });
      }
    } else {
      this.toastr.error("El formulario tiene campos inválidos", 'Error de validación');
      console.warn("Formulario inválido:", this.reservaForm);
    }
  }
  

  canDeactivate(): boolean {
    if (this.formularioCambiado) {
      return confirm('Tienes cambios sin guardar. ¿Estás seguro de que quieres descartar los cambios?');
    }
    return true;
  }

  cambiado(): void {
    this.formularioCambiado = true;
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

  provincias: any[] = []; // Array donde guardaremos las provincias

  actualizarProvincia() {
    if (this.reservaact.titular.pais === 'España') {
      this._reservasService.obtengoProvinciasApi().subscribe({
        next: (resultado) => {
          this.provincias = resultado; // Guardamos el resultado en el array
        },
        error: () => this.toastr.error('Error al obtener provincias'),
      });
    } else {
      this.provincias = []; // Si el país no es España, limpiamos la lista
    }
  }

  actualizarProvinciaActual() {
    this.provincia[0] = this.reservaact.titular.provincia
  }




  municipios: any[] = []; // Array donde guardaremos los municipios
  actualizarPoblacion() {
    let id = this.provincia[0]["idProvincia"]
    console.log(id);

    this._reservasService.obtengoMunicipiosProvinciaApi(id).subscribe({
      next: (resultado) => {
        this.municipios = resultado;
      },
      error: () => this.toastr.error('Error al obtener municipios'),
    });
  }

}

