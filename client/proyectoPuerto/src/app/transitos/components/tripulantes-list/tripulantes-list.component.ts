import { Component, ElementRef, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { TransitosService } from '../../transitos.service';
import { AppService } from '../../../app.service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tripulantes-list',
  standalone: false,

  templateUrl: './tripulantes-list.component.html',
  styleUrl: './tripulantes-list.component.css'
})
export class TripulantesListComponent {
  @ViewChild('documentModal') modalRef!: ElementRef;

  public title: string = "Tripulantes";
  public tripulantes: any[] = [];
  public option: string = '';

  public dtOptions: Config = {};
  public selectedTripulante: string = '';
  public filterSearch: string = '';
  rol: number | null = null;

  public embarcacion: number = 0;
  public numeroDocumento: string = '';

  documentoUrl: string = '';
  esPDF: boolean = false;
  mostrarModal: boolean = false;


  constructor(
    private _transitosService: TransitosService,
    private _appService: AppService,
    private _route: Router,
    private _aroute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });

    this._aroute.params.subscribe(params => {
      this.embarcacion = params['embarcacion'];
      if (this.embarcacion == 0) {
        this.getAllTripulantes();
      } else {
        this.getAllTripulantesEmbarcacion(this.embarcacion);
      }
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

  }

  getAllTripulantesEmbarcacion(embarcacion: number) {
    this._transitosService.getAllTripulantesEmbarcacion(embarcacion).subscribe({
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

  getAllTripulantes() {
    this._transitosService.getAllTripulantes().subscribe({
      next: (response) => {
        console.log('Respuesta completa del backend:', response);

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

  obtenerDocumento(numeroDocumento: string, documentoUrl: string) {
    console.log('numero documento ' + numeroDocumento);
    console.log('documento url ' + documentoUrl);

    this.numeroDocumento = numeroDocumento;
    this.documentoUrl = documentoUrl;
    this.esPDF = this.documentoUrl.toLowerCase().endsWith('.pdf');

    let modal = document.getElementById('documentoModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
      this.mostrarModal = true;
    }
  }

  descargarArchivo() { 
    let a = document.createElement('a');
    a.href = this.documentoUrl;
     a.download = this.documentoUrl.split('/').pop()! ;  // Nombre del archivo que se descargará
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  cerrarModal() {
    const modal = document.getElementById('documentoModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      this.mostrarModal = false;

    }
  }
}
