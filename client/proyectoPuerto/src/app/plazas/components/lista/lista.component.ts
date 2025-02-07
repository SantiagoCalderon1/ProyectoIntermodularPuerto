import { Component } from '@angular/core';
import { PlazasService } from '../../plazas.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-lista',
  standalone: false,
  
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  public data: any[] = [];

  constructor(private plazaService: PlazasService) { }

  ngOnInit(): void {
    this.GET();
  }

  GET(): void {
    this.plazaService.obtengoPlazasApi().subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (error) => {
        console.error('Error en la solicitud', error);
      }
    });
  }

  descargarPDF() {
    const doc = new jsPDF();
    doc.text('Tabla Exportada', 14, 10);
    autoTable(doc, {
      html: '#tbempleados',
    });
    doc.save('tabla.pdf');
  }
}
