import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../../roles.service';
import { Rol } from '../../rol';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario',
  standalone: false,

  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  public idRol: number = 0;
  public rolact: Rol = { id_rol: 0, nombre_rol: '', descripcion: '' }; // Modelo para el rol
  constructor(private _aroute: ActivatedRoute, private _rolesService:
    RolesService, private route: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    // Aquí se inicializa el formulario
    this.idRol = +this._aroute.snapshot.params['id']; // Obtengo el id del rol de la URL
    this.traeRol(this.idRol); // Llama al método para traer el rol
  }

  traeRol(id: number): void {
    this._rolesService.obtenerRolApi(this.idRol).subscribe(
      (respuesta) => {
        // Aquí se carga el rol en el formulario para su edición o visualización
        this.rolact = respuesta.data[0];
      },
      (error) => {
        // Aquí se procesa el error del servicio
        // console.error('Error al obtener el rol: ' + error);
      }
    );
  }
  modificaRol(): void {
    // Actualizamos el rol en el servicio
    this._rolesService.actualizarRolApi(this.idRol, this.rolact).subscribe(
      (respuesta) => {
        this.toastr.success('Rol modificado correctamente!');
        // Luego redirecciono a la lista de roles
        this.route.navigate(['/roles']); // Redirecciono a la lista de roles
      },
      (error) => {
        // Aquí se procesa el error del servicio
        this.toastr.error('Error modificando rol');
      }
    );

  }
}
