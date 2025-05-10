import { Component } from '@angular/core';
import { RecibosService } from '../recibos.service';
import { AppService } from '../../app.service';
import { Recibo } from '../recibo';
import { Rol } from '../../roles/rol';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;

@Component({
  selector: 'app-listarecibos',
  standalone: false,
  templateUrl: './listarecibos.component.html',
  styleUrl: './listarecibos.component.css'
})
export class ListarecibosComponent {
  mostrarDevueltos: boolean = false; // Inicialmente muestro los no devueltos
  constructor(private listaRecibos: RecibosService, private _appService: AppService,private toastr: ToastrService) { }
  recibos: Recibo[] = [];
  public roles: Rol[] = [];
  public rol: number | null = null; // Para controlar el acceso según el rol del usuario
  public selectedRecibo: Recibo | null = null;

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
    this.listaRecibos.obtenerRecibosApi().subscribe({
      next: (resultado) => {
        this.recibos = resultado;
      }
    });
  }

  imprimirRecibo(nFactura: number) {
    console.log("Intentando generar PDF y CSV para la factura:", nFactura);

    const doc = new jsPDF();
    doc.text('Recibo de Pago', 14, 10);

    // Buscar el <td> de la factura
    const celda = document.getElementById('factura-' + nFactura);

    if (!celda) {
      console.error("⚠️ No se encontró la celda para la factura:", nFactura);
      return;
    }

    const fechaEmision = celda.nextElementSibling?.textContent || 'Desconocido';
    console.log(`✅ Factura encontrada: ${nFactura}, Fecha: ${fechaEmision}`);

    const tablaTemp = document.createElement('table');
    tablaTemp.innerHTML = `
      <thead>
        <tr>
          <th>Número de Factura</th>
          <th>Fecha de Emisión</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${nFactura}</td>
          <td>${fechaEmision}</td>
        </tr>
      </tbody>
    `;

    try {
      autoTable(doc, { html: tablaTemp, startY: 20 });
      doc.save(`Recibo_${nFactura}.pdf`);
      console.log("✅ PDF generado y descargado");
    } catch (error) {
      console.error("❌ Error al generar el PDF:", error);
    }

    const csvContent = `Número de Factura,Fecha de Emisión\n${nFactura},${fechaEmision}\n`;

    try {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', `Recibo_${nFactura}.csv`);
      a.click();
      window.URL.revokeObjectURL(url);
      console.log("✅ CSV generado y descargado");
    } catch (error) {
      console.error("❌ Error al generar el CSV:", error);
    }
  }
  // Método para abrir el modal
  abrirModal(recibo: Recibo) {
    this.selectedRecibo = recibo; // Asigna el tránsito seleccionado
    const modalElement = document.getElementById('modalConfirmarEliminacion');
    if (modalElement) {
      const modalBootstrap = new bootstrap.Modal(modalElement);
      modalBootstrap.show(); // Abre el modal
    }
  }

  confirmarRetorno(){
    if (this.selectedRecibo) {
      //Le cambiamos el devuelto igual a 0
      this.selectedRecibo.devuelto = 0;
      // Actualizamos el recibo
      this.listaRecibos.actualizarReciboApi(this.selectedRecibo.id_recibo,this.selectedRecibo).subscribe(() => {
        this.toastr.success('Devolución confirmada');
        // Limpiamos la selección
        this.selectedRecibo = null;
      });
      // Cerrar el modal manualmente
      const modalElement = document.getElementById('modalConfirmarEliminacion');
      if (modalElement) {
        const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
        modalBootstrap.hide();
      }
    }
  }
}