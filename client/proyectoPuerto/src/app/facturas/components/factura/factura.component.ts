import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from '../../facturas.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../app.service';
import { Cliente, Factura, Reserva } from '../../facturas';

@Component({
  selector: 'app-factura',
  standalone: false,
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent {
  titulo: string = "Registrar Factura";
  txtBtn: string = "Guardar";
  public num_factura: string = '';
  public tipo: number = 0;
  public formularioCambiado: boolean = false;
  rol: number | null = null;
  clientes: Cliente[] = [];
  reservas: Reserva[] = [];
  public resActual: any[] = [];
  public cliActual: any[] = [];
  public datosReserva: string = "Reserva no seleccionada";
  public datosCliente: string = "Cliente no seleccionado";
  public fecha: string = 'aaaa-mm-dd'

  cliente: Cliente = {
    nif: '',
    nombre: '',
    apellidos: '',
    domicilio: '',
    codigoPostal: '',
    numeroBancario: '',
    telefono: '',
    email: ''
  };
  reserva: Reserva = {
    id_reserva: 0,
    plaza: 0,
    titular: '',
    embarcacion: '',
    fecha_ini: '',
    fecha_fin: ''
  };



  @ViewChild('facturaForm', { static: false }) facturaForm: NgForm | undefined;

  facturaAct: Factura = {
    num_factura: '',
    nif_cliente: '',
    id_reserva: 0,
    fecha_expedicion: '',
    fecha_vencimiento: '',
    base_imponible: 0,
    dias: 0,
    precio_unitario: 0,
    tipo_iva: 0,
    tipo_irpf: 0,
    total: 0,
    cobrada: 0
  };


  constructor(
    private _aroute: ActivatedRoute,
    private _facturasService: FacturasService,
    private _route: Router,
    private toastr: ToastrService,
    private _appService: AppService
  ) { }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
    let fechaHoy = new Date();
    this.fecha = fechaHoy.getDate() + '-' + (fechaHoy.getMonth() + 1) + '-' + fechaHoy.getFullYear();
    console.log(this.fecha);
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.num_factura = this._aroute.snapshot.params['num_factura'];
    this.obtenerClientes();
    this.obtenerReservas();
    if (this.tipo==1) {
      this.obtenerFactura(this.num_factura);
    }
  }

  private obtenerFactura(num_factura: string) {
    this._facturasService.obtengoFacturaApi(num_factura).subscribe({
      next: (resultado) => {
        this.facturaAct = resultado[0];
        this._facturasService.obtengoClienteApi(this.facturaAct.nif_cliente).subscribe({
          next: (resultado) => {
            if (resultado.length > 0) {
              this.cliente = {
                ...resultado[0],
                nombreCompleto: `${resultado[0].nombre} ${resultado[0].apellidos}`
              };
            }
          },
          error: () => this.toastr.error('Error al obtener el cliente')
        });
        

      },
      error: () => this.toastr.error('Error al obtener la factura')
    });
  }

  private obtenerClientes() {
    this._facturasService.obtengoClientesApi().subscribe({
      next: (resultado: Cliente[]) => { // Especificamos el tipo del resultado
        this.clientes = resultado.map((cliente: Cliente) => ({ // Especificamos el tipo de titular
          ...cliente,
          nombreCompleto: `${cliente.nombre} ${cliente.apellidos}`
        }));
      },
      error: () => this.toastr.error('Error al obtener los clientes')
    });
  }

  actualizaClienteActual() {
    this.cliActual[0] = this.cliente
  }

  private obtenerReservas() {
    this._facturasService.obtengoReservasApi().subscribe({
      next: (resultado) => {
        this.reservas = resultado;
      },
      error: () => this.toastr.error('Error al obtener la factura')
    });
  }

  actualizaReservaActual() {
    this.resActual[0] = this.reserva
  }

  actualizaBase() {
    this.facturaAct.base_imponible = this.facturaAct.dias * this.facturaAct.precio_unitario;
  }

  actualizaTotal() {
    this.facturaAct.total = this.facturaAct.base_imponible
      + (this.facturaAct.base_imponible * (this.facturaAct.tipo_iva / 100))
      - (this.facturaAct.base_imponible * (this.facturaAct.tipo_irpf / 100));

  }

  guardarFactura(): void {
    if (this.facturaForm?.valid || this.tipo === 2) {
      this.formularioCambiado = false;
      this.facturaAct.nif_cliente = this.cliente.nif

      if (this.tipo === 0) { // Crear nueva factura
        console.log(this.facturaAct.cobrada)
        if (this.facturaAct.cobrada === 1) {
          this._facturasService.generaReciboApi(this.facturaAct.num_factura, this.fecha).subscribe({});
        }
        this._facturasService.guardaNuevaFacturaApi(this.facturaAct).subscribe({
          next: (resultado) => {
            if (resultado === "OK") {
              this.toastr.success('Factura agregada correctamente!');
              this._route.navigate(['/listaFacturas']);
            } else {
              this.toastr.error('Error guardando la factura');
            }
          },
          error: (error) => {
            this.toastr.error('Error guardando la factura');
            console.error(error);
          }
        });

      } else if (this.tipo === 1) { // Modificar factura existente
        if (this.facturaAct.cobrada === 1) {
          this._facturasService.generaReciboApi(this.facturaAct.num_factura, this.fecha).subscribe({});
        }
        console.log(this.facturaAct)
        this._facturasService.modificaFacturaApi(this.num_factura, this.facturaAct).subscribe({
          next: (resultado) => {
            if (resultado === "OK") {
              this.toastr.success('Factura modificada correctamente!');
              this._route.navigate(['/listaFacturas']);
            } else {
              this.toastr.error('Error modificando la factura');
            }
          },
          error: (error) => {
            this.toastr.error('Error modificando la factura');
            console.error(error);
          }
        });

      }
    } else {
      this.toastr.error("El formulario tiene campos inválidos", 'Error de validación');
      console.warn("Formulario inválido:", this.facturaForm);
    }
  }

  canDeactivate(): boolean {
    if (this.formularioCambiado) {
      return confirm('Tienes cambios sin guardar. ¿Estás seguro de que quieres descartar los cambios?');
    }
    return true;
  }

  cambiado(): void {
    this.formularioCambiado = true;
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }
}
