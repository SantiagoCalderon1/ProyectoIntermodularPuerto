import { Component } from '@angular/core';
import { PlazasService } from '../../plazas.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AppService } from '../../../app.service';
import { ReservasService } from '../../reservas.service';

@Component({
  selector: 'app-lista',
  standalone: false,

  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  public dataPlaces: any[] = [];
  public dataReservations: any[] = [];
  rol: number | null = null;
  public activeTab: number;

  constructor(private plazaService: PlazasService, private reservasService: ReservasService, private _appService: AppService) {

    const storedTab = localStorage.getItem('activeTab');
    this.activeTab = storedTab ? parseInt(storedTab, 10) : 2;
  
  }

  ngOnInit(): void {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
    const storedTab = localStorage.getItem('activeTab');
    this.activeTab = storedTab ? parseInt(storedTab, 10) : 2;

    this.GET();
  }

  GET(): void {
    this.plazaService.obtengoPlazasApi().subscribe({
      next: (response) => {
        this.dataPlaces = response;
      },
      error: (error) => {
        console.error('Error en la solicitud', error);
      }
    });

    this.reservasService.obtengoReservasApi().subscribe({
      next: (response) => {
        this.dataReservations = response;
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

  setActiveTab(tab: number) {
    this.activeTab = tab;
    localStorage.setItem('activeTab', tab.toString());
  }
}
