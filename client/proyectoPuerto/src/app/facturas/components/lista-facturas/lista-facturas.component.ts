import { Component } from '@angular/core';
import { AppService } from '../../../app.service';
import { FacturasService } from '../../facturas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-lista-facturas',
  standalone: false,
  
  templateUrl: './lista-facturas.component.html',
  styleUrl: './lista-facturas.component.css'
})
export class ListaFacturasComponent {
  public facturas: any[] = [];
  rol: number | null = null;

  constructor(private _aroute: ActivatedRoute, private _facturasService: FacturasService, private _route: Router, private toastr: ToastrService, private _appService: AppService) { }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
    //this.tipo = +this._aroute.snapshot.params['tipo'];
    //this.id_reserva = +this._aroute.snapshot.params['id_reserva'];
    this.traeFacturas();

    //if (this.tipo == 1 || this.tipo == 2) {
    //  this.traeReserva(this.id_reserva);
    //  setTimeout(() => {
    //  }, 100);
    //}
  }
private traeFacturas() {
  this._facturasService.obtengoFacturasApi().subscribe({
    next: (resultado) => {
      //console.log(resultado);
      this.facturas = resultado;
    },
    error: (error) => {
      this.toastr.error(error, 'Error al obtener la factura');
    },
    complete: () => {
      // console.log('Operación completada.');
    }
  });
}

imprimirFactura(factura: any) {
    const doc = new jsPDF();
    this._facturasService.obtengoClienteApi(factura.nif_cliente).subscribe({
      next: (response) => {
        //console.log(response);
        let cliente = response[0];

    // Datos de la factura
    doc.setFontSize(10);
    doc.text(`Fecha expedición: ${factura.fecha_expedicion}`, 14, 20);
    doc.text(`Fecha vencimiento: ${factura.fecha_vencimiento}`, 14, 30);
    doc.text(`Número de la factura: ${factura.num_factura}`, 14, 40);
    doc.setFontSize(13);
    doc.text(`Datos del cliente`, 14, 60);
    doc.setFontSize(10);
    doc.text(`Nombre: ${cliente.nombre} `, 14, 70);
    doc.text(`Apellidos: ${cliente.apellidos} `, 14, 80);
    doc.text(`NIF: ${factura.nif_cliente}`, 14, 90);
    doc.text(`Correo electrónico: ${cliente.email} `, 14, 100);
    doc.text(`Domicilio: ${cliente.domicilio} `, 14, 110);
    doc.text(`CP: ${cliente.codigoPostal} `, 14, 120);
    doc.setDrawColor(0); // Color negro
    doc.setLineWidth(0.5); // Grosor de la línea
    doc.line(14, 130, 196, 130); // (x1, y1, x2, y2)
    doc.text(`Número de la reserva`, 14, 140);
    doc.text(`${factura.id_reserva}`, 14, 150);
    doc.text(`Número de dias`, 64, 140);
    doc.text(`${factura.dias}`, 64, 150);
    doc.text(`Precio por dia`, 114, 140);
    doc.text(`${factura.precio_unitario}`, 114, 150);
    doc.text(`Precio total`, 164, 140);
    doc.text(`${factura.base_imponible}`, 164, 150);
    doc.setDrawColor(0); // Color negro
    doc.setLineWidth(0.5); // Grosor de la línea
    doc.line(14, 160, 196, 160); // (x1, y1, x2, y2)

    doc.text(`Base imponible:`, 14, 170);
    doc.text(`${factura.base_imponible}`, 54, 170);
    doc.text(`IVA:`, 14, 180);
    doc.text(`${factura.tipo_iva}%`, 54, 180);
    doc.text(`IRPF:`, 14, 190);
    doc.text(`${factura.tipo_irpf}%`, 54, 190);
    doc.text(`Total:`, 14, 200);
    doc.text(`${factura.total}`, 54, 200);


    /* doc.text(`Reserva: ${factura.id_reserva}`, 14, 110);
    doc.text(`Días: ${factura.dias}`, 14, 120);
    doc.text(`Total: ${factura.total} €`, 14, 130); */

    // Generar y abrir la ventana de impresión
    doc.save(`Factura_${factura.num_factura}.pdf`);
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener el cliente');
      }
    });
}

descargarPDF() {
  const doc = new jsPDF();
  doc.text('Tabla Exportada', 14, 10);
  autoTable(doc, {
    html: '#tableFacturas',
  });
  doc.save('tabla.pdf');
}
}
