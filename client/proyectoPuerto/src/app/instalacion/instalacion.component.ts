import { Component, OnInit } from '@angular/core';
import { InstalacionService } from './instalacion.service';

@Component({
  selector: 'app-instalacion',
  standalone: false,

  templateUrl: './instalacion.component.html',
  styleUrl: './instalacion.component.css'
})
export class InstalacionComponent {
  codigo = "";
  puerto = "";
  descripcion = "";
  tipo_instalacion = "";
  fecha_disposicion = "";
  estado = false;
  embarcacion_menores = false;

  constructor(private instalacionesService: InstalacionService) { }

  instalaciones: any = []; // array para almacenar instalaciones

  //constructor()
  agregarInstalacion() {
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
      },
      error: (error) => {
        console.log("Error al crear instalación", error);
      },
      complete: () => {
        console.log("Petición completada");
      }
    });
  }
}
