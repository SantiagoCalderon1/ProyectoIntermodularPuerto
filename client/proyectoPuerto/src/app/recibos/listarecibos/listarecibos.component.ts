import { Component } from '@angular/core';

@Component({
  selector: 'app-listarecibos',
  templateUrl: './listarecibos.component.html',
  styleUrl: './listarecibos.component.css'
})
export class ListarecibosComponent {
  // constructor(private listamuellesService: MuellesService, private _appService: AppService) { }
  // muelles: Muelle[] = [];
  // public roles: Rol[] = [];
  // public rol: number | null = null; // Para controlar el acceso según el rol del usuario
  // public selectedMuelle: number = 0;

  // ngOnInit() {
  //   this._appService.rol$.subscribe(rol => {
  //     this.rol = rol;
  //   });
  //   this.listamuellesService.obtengoMuellesApi().subscribe({
  //     next: (resultado) => {
  //       this.muelles = resultado.data;
  //     },
  //     error: (error) => {
  //       // console.error('Error:', error);
  //     }
  //   });

  //   this.selectedMuelle = 0; // Inicializar la selección de muelle en 0
  // }
}
