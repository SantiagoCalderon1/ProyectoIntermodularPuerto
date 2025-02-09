import { Component, OnInit } from '@angular/core';
import { InstalacionService } from '../../instalacion.service';
import { ListaComponent } from '../lista/lista.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Instalacion } from '../instalacion';

@Component({
  selector: 'app-instalacion',
  standalone: false,

  templateUrl: './instalacion.component.html',
  styleUrl: './instalacion.component.css'
})
export class InstalacionComponent {
  public instalacionAct: Instalacion = { id_instalacion: 0, codigo: "", descripcion: "", fecha_disposicion: "", tipo_instalacion: "", estado: 0, puerto: "" }

  public idMod = 0;
  public tipo = 0;
  public estadoString = "";
  mensajeCreacion = 2;
  mensajeEliminacion = 3;

  constructor(private instalacionesService: InstalacionService, private route: Router, private _aroute: ActivatedRoute) { }
  instalaciones: any = []; // array para almacenar instalaciones
  ngOnInit() {
    this.idMod = this._aroute.snapshot.params['id_instalacion']; // Recibimos parámetro
    this.tipo = this._aroute.snapshot.params['tipo'];            //
    console.log(this.idMod);
    this.traeInstalacion(this.idMod);
  }
  traeInstalacion(id: number): void {
    this.instalacionesService.getInstalacion(id).subscribe({
      next: (response) => {
        console.log("response");
        console.log(response);
        this.instalacionAct.codigo = response["codigo"];
        this.instalacionAct.puerto = response["puerto"];
        this.instalacionAct.tipo_instalacion = response["tipo_instalacion"]
        this.instalacionAct.descripcion = response["descripcion"];
        this.instalacionAct.fecha_disposicion = response["fecha_disposicion"];
        this.instalacionAct.estado = response["estado"];
      },
      error: (error) => {
        console.log("Error al obtener la instalación:", error);
      }
    })
  }

  agregarInstalacion() {
    console.log("idMod");
    console.log(this.idMod);
    if (this.instalacionAct.codigo == "" || this.instalacionAct.puerto == "" || this.instalacionAct.tipo_instalacion == "" || this.instalacionAct.descripcion == "" || this.instalacionAct.fecha_disposicion == "") {
      this.mensajeCreacion = 0;
      console.log("Error, inputs sin rellenar");
      return
    }
    const nuevaInstalacion = {
      id_instalacion: this.idMod,
      codigo: this.instalacionAct.codigo,
      puerto: this.instalacionAct.puerto,
      descripcion: this.instalacionAct.descripcion,
      tipo_instalacion: this.instalacionAct.tipo_instalacion,
      fecha_disposicion: this.instalacionAct.fecha_disposicion,
      estado: this.instalacionAct.estado,
    }
    console.log(nuevaInstalacion);
    if (this.tipo == 1) {
      this.instalacionesService.modifyInstalacion(nuevaInstalacion).subscribe({
        next: (response) => {
          console.log("response");
          console.log(response);
          this.mensajeCreacion = 1;
        },
        error: (error) => {
          console.log("error");
          console.log(error);
          this.mensajeCreacion = 0;
        }
      })
    } else if (this.tipo == 2) {
      this.instalacionesService.crearInstalacion(nuevaInstalacion).subscribe({
        next: (response) => {
          console.log("Instalación creada", response);
          if (nuevaInstalacion["estado"] == 1) {
            this.estadoString = "BUENO";
          } else {
            this.estadoString = "MALO";
          }
          console.log(nuevaInstalacion.codigo)
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
}
