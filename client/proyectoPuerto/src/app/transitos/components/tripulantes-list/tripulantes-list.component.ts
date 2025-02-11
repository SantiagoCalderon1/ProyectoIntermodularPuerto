import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { TransitosService } from '../../transitos.service';
import { AppService } from '../../../app.service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-tripulantes-list',
  standalone: false,

  templateUrl: './tripulantes-list.component.html',
  styleUrl: './tripulantes-list.component.css'
})
export class TripulantesListComponent {
  public title: string = "Tripulantes";
  public tripulantes: any[] = [];

  public dtOptions: Config = {};
  public selectedTripulante: string = '';
  public filterSearch: string = '';
  rol: number | null = null;


  constructor(private _transitosService: TransitosService, private _appService: AppService
  ) { }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });

    this.selectedTripulante = '';

    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        processing: "Procesando...",
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron resultados",
        emptyTable: "Ningún dato disponible en esta tabla",
        infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        infoFiltered: "(filtrado de un total de _MAX_ registros)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior"
        },
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      },
    };

    this._transitosService.getAllTripulantes().subscribe({
      next: (response) => {
        if (response.success) { // esto debe ser true
          this.tripulantes = response.data;
        } else {
          console.error('Error:', response.exception);
        }
      },
      error: (error) => {
        console.error('Error al recibir datos:', error);
      }
    });
  }

  descargarPDF() {
    const doc = new jsPDF();
    doc.text('Tabla de usuarios.', 14, 10);
    autoTable(doc, {
      html: '#tableUsers',
      startY: 20,
    });
    doc.save('tablaUsers.pdf');
  }

  selectUser(numeroDocumento: string, event: any) {
    this.selectedTripulante = event.target.checked ? numeroDocumento : '';
  }

  obtenerDocumento(numeroDocumento: string){

  }

}
