import { Component } from '@angular/core';
import { TransitosService } from '../../transitos.service';
import { Transito } from '../Transito';
import { Rol } from '../../../roles/rol';
import { AppService } from '../../../app.service';
import { RolesService } from '../../../roles/roles.service';
declare var bootstrap: any;

@Component({
  selector: 'app-transitos-list',
  standalone: false,
  templateUrl: './transitos-list.component.html',
  styleUrls: ['./transitos-list.component.css']
})
export class TransitosListComponent {
  mensaje = 0;
  transitos: Transito[] = [];
  public roles: Rol[] = [];
  rol: number | null = null;
  transitoSeleccionado: Transito | null = null;

  constructor(
    private transitosService: TransitosService,
    private rolesService: RolesService,
    private _appService: AppService
  ) {}

  ngOnInit(): void {
    this.listarTransitos();

    this._appService.rol$.subscribe({
      next: (rol) => {
        this.rol = rol;
      },
      error: (error) => {
        // console.error('Error al obtener rol:', error);
      }
    });

    this.rolesService.obtengoRolesApi().subscribe({
      next: (resultado) => {
        this.roles = resultado.data;
      },
      error: (error) => {
        // console.error('Error al obtener roles:', error);
      }
    });
  }

  listarTransitos() {
    this.transitosService.getAllTransitos().subscribe({
      next: (response) => {
        this.transitos = response;
      },
      error: (error) => {
        // console.log('Error al obtener transitos', error);
      },
      complete: () => {
        // console.log('Operación completada');
      }
    });
  }

  eliminarTransito(embarcacion: number) {
    // console.log('embarcacion=' + embarcacion);
    this.transitosService.desecharTransito(embarcacion).subscribe({
      next: (response) => {
        // console.log('response', response);
        this.mensaje = 1;
        this.listarTransitos();
      },
      error: (error) => {
        // console.log('Error al eliminar el transito', error);
        this.mensaje = 2;
        this.listarTransitos();
      },
      complete: () => {
        // console.log('Petición completada');
        this.listarTransitos();
      }
    });
  }

  confirmarEliminacion() {
    if (this.transitoSeleccionado) {
      this.eliminarTransito(this.transitoSeleccionado.embarcacion);
      // Cerrar el modal manualmente
      const modalElement = document.getElementById('modalConfirmarEliminacion');
      if (modalElement) {
        const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
        modalBootstrap.hide();
      }
      // Limpia la selección
      this.transitoSeleccionado = null;
    }
  }

  // Método para abrir el modal
  abrirModal(transito: Transito) {
    this.transitoSeleccionado = transito; // Asigna el tránsito seleccionado
    const modalElement = document.getElementById('modalConfirmarEliminacion');
    if (modalElement) {
      const modalBootstrap = new bootstrap.Modal(modalElement);
      modalBootstrap.show(); // Abre el modal
    }
  }
}
