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
  public titular: Titular = new Titular(0, "", "", "", 0, "", "", "", 0, 0, "", "", "", "", "", 0, 0, "");
  public embarcacion: Embarcacion = new Embarcacion(0, "", 0, 0, 0, "", "", "", 0);
  public plaza: Plaza = new Plaza(0, "", "");
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
    0, // titular
    0, //embarcacion
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
    this.id_reserva = +this._aroute.snapshot.params['id_reserva'];
    this.titulares = [];
    this.traeTitulares();
    this.traeEmbarcaciones();
    this.traePlazas();

    if (this.tipo == 1 || this.tipo == 2) {
      this.traeReserva(this.id_reserva);
      setTimeout(() => {
      }, 100);
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
        // console.log('Operación completada.');
      }
    });
  }

  private traeReserva(id_reserva: number) {
    this._reservasService.obtengoReservaApi(id_reserva).subscribe({
      next: (resultado) => {
        this.reservaact = resultado[0];
        this._reservasService.obtengoTitularApi(this.reservaact.titular).subscribe({
          next: (resultado) => {
            console.log(resultado)
            this.titulares.forEach((titular: Titular) => {
              console.log(titular)
              if (titular.id_titular === this.reservaact.titular) {
                this.titular = titular;
              }
            });
            this.actualizaTitularActual();
          },
          error: () => this.toastr.error('Error al obtener el titular')
        });
        this._reservasService.obtengoEmbarcacionApi(this.reservaact.embarcacion).subscribe({
          next: (resultado) => {
            this.embarcacion = resultado[0];
          },
          error: () => this.toastr.error('Error al obtener la embarcación')
        });
        this._plazasService.obtengoPlazaApi(this.reservaact.plaza).subscribe({
          next: (resultado) => {
            this.plaza = resultado[0];
          },
          error: () => this.toastr.error('Error al obtener la embarcación')
        });
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener la plaza');
      },
      complete: () => {
        // console.log('Operación completada.');
      }
    });
  }

  private traeTitulares() {
    this._reservasService.obtengoTitularesApi().subscribe({
      next: (resultado: Titular[]) => { // Especificamos el tipo del resultado
        this.titulares = resultado.map((titular: Titular) => ({ // Especificamos el tipo de titular
          ...titular,
          nombreCompleto: `${titular.nombre} ${titular.apellidos}`
        }));
        console.log(this.titulares);
      },
      error: () => this.toastr.error('Error al obtener titulares')
    });
  }
  

  actualizaTitularActual() {
    this.titActual[0] = this.titular
    this.traeEmbarcacionTitular();
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

  public embarcacionesFiltradas: any[] = [];

private traeEmbarcaciones() {
  this._reservasService.obtengoEmbarcacionesApi().subscribe({
    next: (resultado) => {
      this.embarcaciones = resultado || [];
      this.embarcacionesFiltradas = this.embarcaciones.filter(e => e.titular === 4);
    },
    error: () => this.toastr.error('Error al obtener embarcaciones')
  });
}



actualizaEmbarcacionActual() {
  this.embActual[0] = this.embarcacion;
}

actualizaEmbarcacion() {
  let id = 0;
  if (!this.embActual || this.embActual.length === 0 || !this.embActual[0]?.id_embarcacion) {
      this.datosEmbarcacion = "Embarcación no seleccionada";
  } else {
      id = this.embActual[0]["id_embarcacion"];
      this._reservasService.obtengoEmbarcacionApi(id).subscribe({
          next: (resultado) => {
              this.datosEmbarcacion = resultado[0]["matricula"];
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
        },
        error: () => this.toastr.error('Error')
      });
    }
  }

  guardaReserva(): void {
    if (this.reservaForm?.valid || this.tipo === 2) {
      this.formularioCambiado = false;
      this.reservaact.embarcacion = this.embarcacion.id_embarcacion
      this.reservaact.titular = this.titular.id_titular
      this.reservaact.plaza = this.plaza.id_plaza_base
  
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
            // console.error(error);
          },
          // complete: () => console.log('Operación completada.')
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
        console.log('Eliminando reserva:', this.id_reserva);
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
}

