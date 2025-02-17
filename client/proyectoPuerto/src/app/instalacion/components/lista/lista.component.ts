import { Component } from '@angular/core';
import { InstalacionService } from '../../instalacion.service';
import { Instalacion } from '../instalacion';
declare var bootstrap: any;

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
  instalacionSeleccionada: Instalacion | null = null;
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

        // console.log(this.instalaciones);
      },
      error: (error) => {
        // console.log("Error al obtener instalaciones", error);
      },
      complete: () => {
        // console.log("Operación completada");
      }
    });
  }

  eliminarInstalacion(id: number) {
    // console.log(id);
    this.instalacionesService.deshecharInstalacion(id).subscribe({
      next: (response) => {
        if (response.error != "Error al eliminar la instalacion") {
          // console.log("Instalacion eliminada", response);
          this.mensajeEliminacion = 1;
        } else {
          // console.log("Error al eliminar la instalacion", response.error);
          this.mensajeEliminacion = 0;
        }
        this.listarInstalaciones();
      },
      error: (error) => {
        // console.log("Error al eliminar la instalacion", error);
        this.mensajeEliminacion = 0;
        this.listarInstalaciones();
      },
      complete: () => {
        // console.log("Petición completada");
        this.listarInstalaciones();
      }
    })

  }

  confirmarEliminacion() {
    if (this.instalacionSeleccionada) {
      this.eliminarInstalacion(this.instalacionSeleccionada.id_instalacion);
      // Cerrar el modal manualmente
      const modalElement = document.getElementById('modalConfirmarEliminacion');
      if (modalElement) {
        const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
        modalBootstrap.hide();
      }
      // Limpia la selección
      this.instalacionSeleccionada = null;
    }
  }

  // Método para abrir el modal
  abrirModal(instalacion: Instalacion) {
    this.instalacionSeleccionada = instalacion; // Asigna el tránsito seleccionado
    const modalElement = document.getElementById('modalConfirmarEliminacion');
    if (modalElement) {
      const modalBootstrap = new bootstrap.Modal(modalElement);
      modalBootstrap.show(); // Abre el modal
    }
  }
}
