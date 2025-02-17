import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Plaza } from '../../plazas';
import { ActivatedRoute, Router } from '@angular/router';
import { PlazasService } from '../../plazas.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-plaza',
  standalone: false,
  templateUrl: './plaza.component.html',
  styleUrl: './plaza.component.css'
})
export class PlazaComponent {
  @ViewChild('plazaForm', { static: false }) plazaForm: NgForm | undefined;

  public plazaact: Plaza = { id_plaza_base: 0, nombre: '', instalacion: ''};
  public titulo: string = 'Nueva Plaza';
  public tipo: number = 0;
  public id_plaza_base: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  rol: number | null = null;

  public instalaciones: any[] = []; // Lista de instalaciones

  constructor(private _aroute: ActivatedRoute, private _plazasService: PlazasService, private _route: Router, private toastr: ToastrService, private _appService: AppService) { }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id_plaza_base = +this._aroute.snapshot.params['id_plaza_base'];

    if (this.tipo == 1 || this.tipo == 2) {
      this.traePlaza(this.id_plaza_base);
    }

    this.obtenerInstalaciones(); // Cargar instalaciones disponibles
  }

  private traePlaza(id_plaza_base: number) {
    this._plazasService.obtengoPlazaApi(id_plaza_base).subscribe({
      next: (resultado) => {
        // console.log(resultado[0]);
        this.plazaact = resultado[0];
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener la plaza');
      },
      complete: () => {
        // console.log('Operación completada.');
      }
    });
  }

  private obtenerInstalaciones() {
    this._plazasService.obtengoInstalacionesApi().subscribe({
      next: (resultado) => {
        this.instalaciones = resultado;
      },
      error: (error) => {
        this.toastr.error('Error al obtener las instalaciones', 'Error');
      }
    });
  }

  guardaPlaza(): void {
    if (this.plazaForm!.valid || this.tipo == 2) {
      this.formularioCambiado = false;

      if (this.tipo == 0) {
        this._plazasService.guardaNuevaPlazaApi(this.plazaact).subscribe({
          next: (resultado) => {
            if (resultado == "OK") {
              this.toastr.success('Plaza agregada correctamente!');
              this._route.navigate(['/listaPlazas']);
            } else {
              this.toastr.error('Error guardando plaza');
            }
          },
          error: () => this.toastr.error('Error guardando plaza'),
          // complete: () => console.log('Operación completada.')
        });
      } else if (this.tipo == 1) {
        this._plazasService.modificaPlazaApi(this.id_plaza_base, this.plazaact).subscribe({
          next: (resultado) => {
            if (resultado == "OK") {
              this.toastr.success('Plaza modificada correctamente!');
              this._route.navigate(['/listaPlazas']);
            } else {
              this.toastr.error('Error modificando plaza');
            }
          },
          error: () => this.toastr.error('Error modificando plaza'),
          // complete: () => console.log('Operación completada.')
        });
      } else if (this.tipo == 2) {
        this._plazasService.borraPlazaApi(this.id_plaza_base).subscribe({
          next: (resultado) => {
            if (resultado == "OK") {
              this.toastr.success('Plaza eliminada correctamente!');
              this._route.navigate(['/listaPlazas']);
            } else {
              this.toastr.error('Error eliminando plaza');
            }
          },
          error: () => this.toastr.error('Error eliminando plaza'),
          // complete: () => console.log('Operación completada.')
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
}
