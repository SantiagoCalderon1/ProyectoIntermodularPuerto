import { Component } from '@angular/core';
import { UsersService } from '../../users.service';
import { Config } from 'datatables.net';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AppService } from '../../../app.service';
import { User } from '../../user';

@Component({
  selector: 'app-user-list',
  standalone: false,

  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  public title: string = "Usuarios";
  public users: any[] = [];
  public dtOptions: Config = {};
  public selectedUser: string = '';
  public filterSearch: string = '';
  rol: number | null = null;



  constructor(private _userService: UsersService, private _appService: AppService,
  ) { }

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });


    this.selectedUser = '';

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


    this._userService.getAllUser().subscribe({
      next: (response) => {
        if (response.success) { // esto debe ser true
          this.users = response.data;
          console.log(response.data);
        } else {
          console.error('Error:', response.exception);
        }
      },
      error: (error) => {
        console.error('Error al recibir datos:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
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

  selectUser(username: string, event: any) {
    if (event.target.checked) {
      this.selectedUser = username;
    } else {
      this.selectedUser = '';
    }
  }
}
