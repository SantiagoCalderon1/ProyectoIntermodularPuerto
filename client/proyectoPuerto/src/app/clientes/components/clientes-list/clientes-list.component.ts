import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ClientesService } from '../../clientes.service';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'datatables.net';
import { cliente } from '../../cliente';

@Component({
  selector: 'app-clientes-list',
  standalone: false,

  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css'
})
export class ClientesListComponent {
  public title: string = "Listado Todos Los Clientes";
  public clientes: any[] = [];
  public option: string = '';

  public dtOptions: Config = {};
  public selectedCliente: string = '';
  public filterSearch: string = '';
  rol: number | null = null;

  public nif: string = '';

  clienteSelected: cliente | null = null;

  constructor(
    private _clientesService: ClientesService,
    private _appService: AppService,
    private _route: Router,
    private _aroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });

    this.getAllClientes();

    this.selectedCliente = '';

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

  getAllClientes() {
    this._clientesService.getAllClientes().subscribe({
      next: (response) => {
        if (response.success) { // esto debe ser true
          this.clientes = response.data;
        } else {
          //console.error('Error:', response.exception);
        }
      },
      error: (error) => {
        //console.error('Error al recibir datos:', error);
      }
    });
  }

  descargarPDF() {
    const doc = new jsPDF();
    doc.text('Tabla de clientes.', 14, 10);
    autoTable(doc, {
      html: '#tableClientes',
      startY: 20,
    });
    doc.save('tablaClientes.pdf');
  }
}
