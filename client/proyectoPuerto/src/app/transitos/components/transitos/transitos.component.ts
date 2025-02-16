import { Component } from '@angular/core';
import { Transito } from '../Transito';
import { TransitosService } from '../../transitos.service';
import { InstalacionService } from '../../../instalacion/instalacion.service';
import { error } from 'jquery';
import { Instalacion } from '../../../instalacion/components/instalacion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transitos',
  standalone: false,

  templateUrl: './transitos.component.html',
  styleUrl: './transitos.component.css'
})
export class TransitosComponent {
  constructor(private transitosService: TransitosService, private instalacionService: InstalacionService, private _aroute: ActivatedRoute) { }

  public idMod = 0;
  public tipo = 0;

  ngOnInit() {
    this.getCodigosInstalaciones();

    this.idMod = this._aroute.snapshot.params['embarcacion']; // Recibimos parámetro
    this.tipo = this._aroute.snapshot.params['tipo'];         //

    this.getTransito(this.idMod);
  }

  public codigosInstalaciones: any = [];
  public mensaje = -1;


  public hoy = new Date();
  public transitoAct: Transito = { anyo: 0, pantalan: 0, instalacion: "", fecha_entrada: this.hoy, fecha_salida: this.hoy, patron: "", embarcacion: 0, datos_estancia: "" }

  public instalacionSeleccionada: any = this.transitoAct.instalacion;

  getCodigosInstalaciones() {

    this.instalacionService.getInstalaciones().subscribe({
      next: (response) => {
        console.log(response);
        
        this.codigosInstalaciones = response.map((instalacion: Instalacion) =>
          instalacion.codigo // Retorna solo el valor del código
        );
      },
      error: (error) => {
        console.log("Error al listar codigo de instalaciones", error);
      }
    });
  }
  getTransito(embarcacion: number) {
    this.transitosService.getTransito(embarcacion).subscribe({
      next: (response) => {
        console.log("Response completo: ", response);
        this.transitoAct.anyo = response.anyo;
        this.transitoAct.datos_estancia = response.datos_estancia;
        this.transitoAct.embarcacion = response.embarcacion;
        this.transitoAct.fecha_entrada = response.fecha_entrada;
        this.transitoAct.fecha_salida = response.fecha_salida;
        this.transitoAct.instalacion = response.instalacion;
        this.transitoAct.pantalan = response.pantalan;
        this.transitoAct.patron = response.patron;

        console.log("transito actual: ", this.transitoAct);
      },
      error: (error) => {
        console.log("Error al obtener transito", error);
      }
    });
  }


  agregarTransito() {
    console.log("tipo: " + this.tipo);
    if (this.tipo == 2) {
      console.log("TransitoAct" + this.transitoAct);
      let fEntrada = this.transitoAct.fecha_entrada;
      let fSalida = this.transitoAct.fecha_salida;
      let fecha_valida = this.comprobarEntradaSalida(fEntrada, fSalida);
      if (fecha_valida) {
        this.transitosService.nuevoTransito(this.transitoAct).subscribe({
          next: (response) => {
            console.log("Transito creado", response);
            this.mensaje = 1;
          },
          error: (error) => {
            console.log("error al crear transito", error);
            this.mensaje = 0;
          },
          complete: () => {
            console.log("Peticion completada");
          }
        })
      } else {
        console.log("fechas no válidas");
        this.mensaje = 2;
      }
    } else if (this.tipo == 1) {
      this.transitosService.updateTransito(this.transitoAct).subscribe({
        next: (response) => {
          console.log("Transito modificado", response);
          this.mensaje = 1;
        },
        error: (error) => {
          console.log("Error al modificar transito", error);
        }
      })
    }


  }

  comprobarEntradaSalida(entrada: any, salida: any): boolean {
    let fechaEntrada = new Date(entrada);
    let fechaSalida = new Date(salida);
    let hoy = new Date();

    // asegurando que las fechas sean validas
    if (isNaN(fechaEntrada.getTime()) || isNaN(fechaSalida.getTime())) {
      console.error("Fechas inválidas:", entrada, salida);
      return false;
    }

    let resta = fechaSalida.getTime() - fechaEntrada.getTime();

    // Verifica que la fecha de salida sea posterior a la de entrada
    if (resta < 0) {
      return false;
    }

    // Verifica que ambas fechas no sean anteriores a hoy
    if (hoy > fechaSalida || hoy > fechaEntrada) {
      return false;
    }

    return true;
  }


}
