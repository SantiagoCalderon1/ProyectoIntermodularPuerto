import { Component } from '@angular/core';
import { PlazasService } from '../../plazas.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-lista',
  standalone: false,

  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  public data: any[] = [];
  rol: number | null = null;

  constructor(private plazaService: PlazasService, private _appService: AppService) { }

  ngOnInit(): void {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
    console.log(this.data);

    this.GET();
  }

  GET(): void {
    this.plazaService.obtengoPlazasApi().subscribe({
      next: (response) => {
        console.log(response);
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
      html: '#tableAuthorizations',
    });
    doc.save('tabla.pdf');
  }
}
