import { Component, ViewChild } from '@angular/core';
import { Embarcacion, Reserva, Titular } from '../../plazas';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasService } from '../../reservas.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../app.service';

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
  rol: number | null = null;
  @ViewChild('plazaForm', { static: false }) plazaForm: NgForm | undefined;

  reservaact: Reserva = new Reserva(
    0, // id_reserva
    0, // plaza
    '', // fecha_inicio
    '', // fecha_fin
    new Titular(0, '', '', '', 0, '', '', '', 0, 0, '', '', '', '', '', 0, 0, ''), // Titular vacío
    new Embarcacion(0, '', 0, 0, 0, '', '', '', 0) // Embarcación vacía
  );
  provincia: any[] = [];

  constructor(private _aroute: ActivatedRoute, private _reservasService: ReservasService, private _route: Router, private toastr: ToastrService, private _appService: AppService) { }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id_reserva = +this._aroute.snapshot.params['id_plaza_base'];

    if (this.tipo == 1 || this.tipo == 2) {
      this.traeReserva(this.id_reserva);
    }
  }

  private traeReserva(id_reserva: number) {
    this._reservasService.obtengoReservaApi(id_reserva).subscribe({
      next: (resultado) => {
        console.log(resultado[0]);
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

  guardaReserva(): void {
    if (this.plazaForm!.valid || this.tipo == 2) {
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

