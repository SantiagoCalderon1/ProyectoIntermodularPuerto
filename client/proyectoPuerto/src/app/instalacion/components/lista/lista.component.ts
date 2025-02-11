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
  constructor(private instalacionesService: InstalacionService) { }
  mensajeEliminacion = 3;
  instalaciones: Instalacion[] = [];
  ngOnInit(): void {
    this.listarInstalaciones();
  }

  listarInstalaciones() {
    this.instalacionesService.getInstalaciones().subscribe({
      next: (response) => {
        this.instalaciones = response.map((instalacion: Instalacion) => { //array transformado
          return {
            ...instalacion, // Copia todos los valores originales
            estado: instalacion.estado == 1 ? "BUENO" : "MALO" // Modifica solo el estado
          };
        });

        console.log(this.instalaciones);
      },
      error: (error) => {
        console.log("Error al obtener instalaciones", error);
      },
      complete: () => {
        console.log("Operación completada");
      }
    });
  }

  eliminarInstalacion(id: number) {
    console.log(id);
    this.instalacionesService.deshecharInstalacion(id).subscribe({
      next: (response) => {
        if (response.error != "Error al eliminar la instalacion") {
          console.log("Instalacion eliminada", response);
          this.mensajeEliminacion = 1;
        } else {
          console.log("Error al eliminar la instalacion", response.error);
          this.mensajeEliminacion = 0;
        }
        this.listarInstalaciones();
      },
      error: (error) => {
        console.log("Error al eliminar la instalacion", error);
        this.mensajeEliminacion = 0;
        this.listarInstalaciones();
      },
      complete: () => {
        console.log("Petición completada");
        this.listarInstalaciones();
      }
    })

  }
}
