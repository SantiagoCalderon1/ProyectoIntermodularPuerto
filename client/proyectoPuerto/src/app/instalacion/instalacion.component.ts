import { Component, OnInit } from '@angular/core';
import { InstalacionService } from './instalacion.service';

@Component({
  selector: 'app-instalacion',
  standalone: false,

  templateUrl: './instalacion.component.html',
  styleUrl: './instalacion.component.css'
})
export class InstalacionComponent {
  id = 0;
  codigo = "";
  puerto = "";
  descripcion = "";
  tipo_instalacion = "";
  fecha_disposicion = "";
  estado = null;
  embarcacion_menores = null;

  mensajeCreacion = 2;
  mensajeEliminacion = 2;

  constructor(private instalacionesService: InstalacionService) { }

  instalaciones: any = []; // array para almacenar instalaciones

  //constructor()
  agregarInstalacion() {
    if (this.codigo == "" || this.puerto == "" || this.descripcion == "" || this.tipo_instalacion == "" || this.fecha_disposicion == "") {
      this.mensajeCreacion = 0;
      console.log("Error, inputs sin rellenar");
      return
    }
    const nuevaInstalacion = {
      codigo: this.codigo,
      puerto: this.puerto,
      descripcion: this.descripcion,
      tipo_instalacion: this.tipo_instalacion,
      fecha_disposicion: this.fecha_disposicion,
      estado: this.estado,
      embarcacion_menores: this.embarcacion_menores
    }
    console.log(nuevaInstalacion);
    this.instalacionesService.crearInstalacion(nuevaInstalacion).subscribe({
      next: (response) => {
        console.log("Instalación creada", response);
        this.instalaciones.push(nuevaInstalacion);
        this.mensajeCreacion = 1;
        console.log(this.instalaciones);
      },
      error: (error) => {
        console.log("Error al crear instalación", error);
        this.mensajeCreacion = 0;
      },
      complete: () => {
        console.log("Petición completada");
      }
    });
  }
  eliminarInstalacion() {
    console.log(this.id);
    this.instalacionesService.deshecharInstalacion(this.id).subscribe({
      next: (response) => {
        if (response.error != "Error al eliminar la instalacion") {
          console.log("Instalacion eliminada", response);
          //falta eliminar la instalacion del array de instalaciones FALTA
          // this.instalaciones.forEach((instalacion: any) => {
          //   if(instalacion.id == this.id){
          //     this.instalaciones
          //   }
          // });
          this.mensajeEliminacion = 1;
        } else {
          console.log("Error al eliminar la instalacion", response.error);
          this.mensajeEliminacion = 0;
        }
      },
      error: (error) => {
        console.log("Error al eliminar la instalacion", error);
        this.mensajeEliminacion = 0;
      },
      complete: () => {
        console.log("Petición completada");
      }
    })
  }
}
