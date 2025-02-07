import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Plaza } from '../../plazas';
import { ActivatedRoute, Router } from '@angular/router';
import { PlazasService } from '../../plazas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plaza',
  standalone: false,
  templateUrl: './plaza.component.html',
  styleUrl: './plaza.component.css'
})
export class PlazaComponent {
  @ViewChild('plazaForm', { static: false }) plazaForm: NgForm | undefined;
  
  public plazaact: Plaza = { id: 0, año: 0, puerto: '', instalacion: '', fecha_inicio: '', datos_titular: '', datos_embarcacion: '', datos_estancia: '' };
  public titulo: string = 'Nueva Plaza';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  
  public instalaciones: any[] = []; // Lista de instalaciones

  constructor(private _aroute: ActivatedRoute, private _plazasService: PlazasService, private _route: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id'];

    if (this.tipo == 1 || this.tipo == 2) {
      this.traePlaza(this.id);
    }

    this.obtenerInstalaciones(); // Cargar instalaciones disponibles
  }

  private traePlaza(id: number) {
    this._plazasService.obtengoPlazaApi(id).subscribe({
      next: (resultado) => {
        console.log(resultado[0]);
        this.plazaact = resultado[0];
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener la plaza');
      },
      complete: () => {
        console.log('Operación completada.');
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
          complete: () => console.log('Operación completada.')
        });
      } else if (this.tipo == 1) {
        this._plazasService.modificaPlazaApi(this.id, this.plazaact).subscribe({
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
        this._plazasService.borraPlazaApi(this.id).subscribe({
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
}
