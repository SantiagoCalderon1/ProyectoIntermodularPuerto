import { Component, OnInit } from '@angular/core';
import { InstalacionService } from '../../instalacion.service';
import { ListaComponent } from '../lista/lista.component';

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
  estado: any;

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
    }
    console.log(nuevaInstalacion);
    this.instalacionesService.crearInstalacion(nuevaInstalacion).subscribe({
      next: (response) => {
        console.log("Instalación creada", response);
        if(nuevaInstalacion["estado"] == 1){
          nuevaInstalacion["estado"] = "BUENO";
        }else{
          nuevaInstalacion["estado"] = "MALO";
        }
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

}
