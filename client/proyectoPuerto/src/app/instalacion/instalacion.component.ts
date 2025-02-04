import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstalacionService } from './instalacion.service';

@Component({
  selector: 'app-instalacion',
  standalone: false,
  
  templateUrl: './instalacion.component.html',
  styleUrl: './instalacion.component.css'
})
export class InstalacionComponent{
  codigo = "";
  puerto = "";
  descripcion = "";
  tipo_instalacion = "";
  fecha_disposicion = "";
  estado = false;
  embarcacion_menores = false;

  constructor(private instalacionesService: InstalacionService) {}

 instalaciones: any = []; // array para almacenar instalaciones
 /**public int $id_instalacion;
    public string $codigo;
    public string $puerto;
    public string $descripcion;
    public string $tipo_instalacion;
    public $fecha_disposicion;
    public $estado;
    public $embarcacion_menores; */
 nuevaInstalacion = {
  codigo: this.codigo,
  puerto: this.puerto,
  descripcion: this.descripcion,
  tipo_instalacion: this.tipo_instalacion,
  fecha_disposicion: this.fecha_disposicion,
  estado: this.estado,
  embarcacion_menores: this.embarcacion_menores
 }
 //constructor()
  agregarInstalacion(){
    this.instalacionesService.crearInstalacion(this.nuevaInstalacion).subscribe(
      (response) =>{
        console.log("instalacion creada");
        this.instalaciones.push(this.nuevaInstalacion);
      },
      (error) =>{
        console.log("error al crear instalacion");

      }
    )
  }
}
