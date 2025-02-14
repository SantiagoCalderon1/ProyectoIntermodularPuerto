import { Component, ViewChild } from '@angular/core';
import { Plaza, Reserva,  } from '../../plazas';
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
  public plazaActual: any[] = [];
  public datosEmbarcacion: string = "Embarcacion no seleccionada";

  rol: number | null = null;
  @ViewChild('reservaForm', { static: false }) reservaForm: NgForm | undefined;

  reservaact: Reserva = new Reserva(
    0, // id_reserva
    0, // plaza
    '', // fecha_inicio
    '', // fecha_fin
    0,
    0,
  );
  public plazas: any[] = [];
  provincia: any[] = [];
  changedTitular: boolean = false;
  changedPlaza: boolean = false;

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

  public changeTitular(){
    this.changedTitular = true;
  }

  public changePlaza(){
    this.changedPlaza = true;
  }

  private traeReserva(id_reserva: number) {
    this._reservasService.obtengoReservaApi(id_reserva).subscribe({
      next: (resultado) => {
        this.reservaact = resultado[0]; 
  
        // Si la API devuelve solo el ID, busca el objeto completo
        const titularEncontrado = this.titulares.find(t => t.id_titular === this.reservaact.titular);
        this.reservaact.titular = titularEncontrado ? titularEncontrado : null;
  
        this.actualizaTitularActual();
        this.actualizaEmbarcacionActual();
        this.actualizaPlazaActual();
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener la reserva');
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

  getEmbarcacionActual() {
    return this.embActual.length > 0 ? this.embActual[0] : null;
  }

  actualizaPlazaActual() {
    this.plazaActual[0] = this.reservaact.plaza
  }

  getPlazaActual() {
    return this.plazaActual.length > 0 ? this.plazaActual[0] : null;
  }

  getTitularActual() {
    return this.titActual.length > 0 ? this.titActual[0] : null;
  }

  guardaReserva(): void {
    if (this.reservaForm?.valid || this.tipo === 2) {
      this.formularioCambiado = false;

      // Asegurar que se asignen correctamente los datos
      let embarcacion = this.getEmbarcacionActual()?.id_embarcacion ?? 0;
      let plaza = this.getPlazaActual()?.id_plaza_base ?? 0;
      let titular = this.getTitularActual()?.id_titular ?? 0;

      this.reservaact.plaza = plaza
      this.reservaact.embarcacion = embarcacion
      this.reservaact.titular = titular

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
}

