import { Component } from '@angular/core';
import { TransitosService } from '../../transitos.service';
import { Transito } from '../Transito';
import { Rol } from '../../../roles/rol';
import { AppService } from '../../../app.service';
import { RolesService } from '../../../roles/roles.service';

@Component({
  selector: 'app-transitos-list',
  standalone: false,

  templateUrl: './transitos-list.component.html',
  styleUrl: './transitos-list.component.css'
})

export class TransitosListComponent {
  mensaje = 0;
  transitos: Transito[] = [];
  public roles: Rol[] = [];
  rol: number | null = null;
  ngOnInit(): void {
    this.listarTransitos();

    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });

    this.listarolesService.obtengoRolesApi().subscribe({
      next: (resultado) => {
        this.roles = resultado.data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
  constructor(private transitosService: TransitosService, private listarolesService: RolesService, private _appService: AppService) { }

  listarTransitos() {
    this.transitosService.getAllTransitos().subscribe({
      next: (response) => {
        this.transitos = response;
        return this.transitos;
      },
      error: (error) => {
        console.log("Error al obtener transitos", error);
      },
      complete: () => {
        console.log("Operación completada");
      }
    })
  }

  eliminarTransito(embarcacion: number) {
    console.log("embarcacion=" + embarcacion);
    this.transitosService.desecharTransito(embarcacion).subscribe({
      next: (response) => {
        console.log("response", response);
        this.mensaje = 1;
        this.listarTransitos();
      },
      error: (error) => {
        console.log("Error al eliminar el transito", error)
        this.mensaje = 2;
        this.listarTransitos();
      },
      complete: () => {
        console.log("peticion completada");
        this.listarTransitos();
      }
    })
  }
}
