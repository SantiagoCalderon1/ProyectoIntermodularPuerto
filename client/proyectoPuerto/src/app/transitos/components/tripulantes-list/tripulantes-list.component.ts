import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { TransitosService } from '../../transitos.service';
import { AppService } from '../../../app.service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Tripulante } from '../../tripulante';
declare var bootstrap: any;


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

  public embarcacion: number = -1;
  public numeroDocumento: string = '';

  documentoUrl: string = '';
  iframeUrl!: SafeResourceUrl;
  esPDF: boolean = false;
  mostrarModal: boolean = false;
  tripulanteSelected: Tripulante | null = null;
  tablaRecargada: number = 0;


  constructor(
    private _transitosService: TransitosService,
    private _appService: AppService,
    private _route: Router,
    private _aroute: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });

    this._aroute.params.subscribe(params => {
      this.embarcacion = params['embarcacion']; 
      console.log(params['embarcacion']);
      
      if (params['embarcacion'] == undefined) {
        this.getAllTripulantes();
      } else{
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



  obtenerDocumento(tripulante: Tripulante) {
    this.tripulanteSelected = tripulante;
    this.documentoUrl = tripulante.documentoUrl!;
    this.numeroDocumento = tripulante.numeroDocumento;
    this.esPDF = this.documentoUrl.toLowerCase().endsWith('.pdf');
    this.setURL(this.documentoUrl);
    const modalElement = document.getElementById('documentoModal');
    if (modalElement) {
      const modalBootstrap = new bootstrap.Modal(modalElement);
      modalBootstrap.show();
    }
  }

  // descargarArchivo() {
  //   let a = document.createElement('a');
  //   a.href = this.documentoUrl;
  //   a.setAttribute('download', this.documentoUrl.split('/').pop() || 'archivo');
  //   a.setAttribute('target', '_self'); 
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // }

  cerrarModal() {
    const modalElement = document.getElementById('documentoModal');
    if (modalElement) {
      const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
      modalBootstrap.hide();
    }
  }


  setURL(unsafeUrl: string) {
    this.iframeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
}
