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
  public plazaact: Plaza = { id: 0, año: 0, puerto: '', instalacion: 0, fecha_inicio: 0, datos_titular: '', datos_embarcacion: '', datos_estancia: ''}
  public titulo: string = 'Nueva Plaza';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;

  constructor(private _aroute: ActivatedRoute, private _plazasService: PlazasService, private _route: Router, private toastr: ToastrService) { }
  ngOnInit() {
    console.log("Parámetros recibidos:", this._aroute.snapshot.params);
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Plaza (' + this.id + ')';
      this.traePlaza(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Plaza (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.traePlaza(this.id);
    }
  }
  private traePlaza(id:number){
    this._plazasService.obtengoPlazaApi(id).subscribe({
      next: (resultado) => {
        if (resultado.mensaje == "OK") {
          this.plazaact = resultado.datos;
        } else {
          this.toastr.error(resultado.mensaje, 'Error al obtener la plaza');
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener la plaza');
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }
  guardaPlaza(): void {

    if (this.plazaForm!.valid || this.tipo == 2 ) { //El borrado era readonly
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._plazasService.guardaNuevaPlazaApi(this.plazaact).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == "OK") {
              this.toastr.success('Se ha agregado '+resultado.datos.nombre, 'Plaza agregada correctamente!');
              this._route.navigate(['/listaPlazas']);
            } else {
              this.toastr.error(resultado.errores, 'Error guardando plaza');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error guardando plaza');
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 1) {
        this._plazasService.modificaPlazaApi(this.id, this.plazaact).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == "OK") {
              this.toastr.success('Se ha modificado '+resultado.datos.nombre, 'Plaza modificada correctamente!');
              this._route.navigate(['/listaPlazas']);
            } else {
              this.toastr.error(resultado.errores, 'Error modificando plaza');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error modificando plaza');
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
      else if (this.tipo == 2) {
        this._plazasService.borraPlazaApi(this.id).subscribe({
          next: (resultado) => {
            if (resultado.mensaje == "OK") {
              this.toastr.success('Se ha eliminado '+resultado.datos.nombre, 'Plaza eliminado correctamente!');
              this._route.navigate(['/plazas']);
            } else {
              this.toastr.error(resultado.errores, 'Error eliminando plaza');
            }
          },
          error: (error) => {
            this.toastr.error(error.error.errores, 'Error eliminando plaza');
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      }
    } else this.toastr.error("El formulario tiene campos inválidos", 'Error de validación');
  }
  // Método que será llamado por el guard
  canDeactivate(): boolean {
    if (this.formularioCambiado) {
      return confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres descartar los cambios?'
      );
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
