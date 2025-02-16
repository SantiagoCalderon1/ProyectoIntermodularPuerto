import { Component, ViewChild } from '@angular/core';
import { Muelle } from '../../muelle';
import { ActivatedRoute, Router } from '@angular/router';
import { MuellesService } from '../../muelles.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-formmuelles',
  standalone: false,

  templateUrl: './formmuelles.component.html',
  styleUrl: './formmuelles.component.css'
})
export class FormmuellesComponent {
  public id_muelle: number = 0;
  public tipo = 0;
  public muelleact: Muelle = { id_muelle: 0, nombre_muelle: '', descripcion: '', ocupado: 0 }; // Modelo para el muelle
  public muelleChecked: boolean = false;
  public ArrayCheckeaos: Array<Muelle>[] = [];
  constructor(private _aroute: ActivatedRoute, private muellesService:
    MuellesService, private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Aquí se inicializa el formulario
    this.id_muelle = +this._aroute.snapshot.params['id']; // Obtengo el id del muelle de la URL
    this.tipo = +this._aroute.snapshot.params['tipo']; // Obtengo el tipo de muelle de la URL (1: entrada, 2: salida)
    if (this.id_muelle > 0) {
      this.traeMuelle(this.id_muelle); // Llama al método para traer el muelle
    }
  }

  comprobarTipo(): void {
    if (this.tipo == 2) {
      this.modificaMuelle();
    }  else if (this.tipo == 3) {
      this.eliminarMuelle();
    } else {
      this.agregarMuelle();
    }
  }

  traeMuelle(id: number): void {
    this.muellesService.obtengoMuelleApi(id).subscribe(
      (respuesta) => {
        // Aquí se carga el muelle en el formulario para su edición o visualización
        this.muelleact = respuesta.data[0];
        if (this.muelleact.ocupado == 1) {
          this.muelleChecked = true;
        } else {
          this.muelleChecked = false;
        }
      },
      (error) => {
        // Aquí se procesa el error del servicio
        console.error('Error al obtener el muelle:' + error);
      }); // Resetea el formulario
  }
  modificaMuelle(): void {
    if(this.muelleChecked) {
      this.muelleact.ocupado = 1;
    } else {
      this.muelleact.ocupado = 0;
    }
    this.muellesService.actualizarMuelleApi(this.id_muelle, this.muelleact).subscribe(
      (respuesta) => {
        if (respuesta.success) {
          this.toastr.success('Muelle actualizado correctamente');
          this.route.navigate(['/muelles']);
        } else {
          this.toastr.error(respuesta.message);
        }
      },
      (error) => {
        console.error('Error al actualizar el muelle:', error);
      }
    );
  }

  agregarMuelle(): void {
    if(this.muelleChecked) {
      this.muelleact.ocupado = 1;
    } else {
      this.muelleact.ocupado = 0;
    }
    if (this.muelleact.nombre_muelle.trim() === '' || this.muelleact.descripcion.trim() === '') {
      this.toastr.error('No estan permitidos los campos vacíos');
      return;
    }
    this.muellesService.agregarMuelleApi(this.muelleact).subscribe(
      (respuesta) => {
        if (respuesta.success) {
          this.toastr.success('Muelle agregado correctamente');         
          this.route.navigate(['/muelles']);
        } else {
          this.toastr.error(respuesta.message);
        }
      }
    );
  }
  eliminarMuelle(): void {
    this.muellesService.eliminarMuelleApi(this.id_muelle).subscribe(
      (respuesta) => {
        if (respuesta.success) {
          this.toastr.success('Muelle eliminado correctamente');
          this.route.navigate(['/muelles']);
        } else {
          this.toastr.error(respuesta.message);
        }
      },
      (error) => {
        console.error('Error al eliminar el muelle:', error);
      }
    );
  }

}
