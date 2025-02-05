import { Component } from '@angular/core';
import { InstalacionService } from '../../instalacion.service';
import { Instalacion } from '../instalacion';

@Component({
  selector: 'app-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  constructor(private instalacionesService: InstalacionService,) { }
  mensajeEliminacion = 3;
  instalaciones: Instalacion[] = [];
  ngOnInit(): void {
this.listarInstalaciones();
  }

  listarInstalaciones() {
    this.instalacionesService.getInstalaciones().subscribe({
      next: (response) => {
        response.forEach((instalacion: Instalacion) => {
          this.instalaciones = response;
        });
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("Operacion compleatada");
      }
    })
  }
  eliminarInstalacion(id:number) {
    console.log(id);
    this.instalacionesService.deshecharInstalacion(id).subscribe({
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
    this.listarInstalaciones();
  }
}
