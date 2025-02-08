import { Component } from '@angular/core';
import { Rol } from '../../rol';
import { RolesService } from '../../roles.service';
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
  constructor(private listarolesService: RolesService) { }
  roles: Rol[] = [];

  ngOnInit() {

    this.listarolesService.obtengoRolesApi().subscribe({
      next: (resultado) => {
        this.roles = resultado.data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  descargarPDF() {
    const doc = new jsPDF(); // Crear instancia de jsPDF
    // Agregar título o texto opcional
    doc.text('Lista de Roles Exportada', 14, 10);
    // Seleccionar la tabla y convertirla a un formato adecuado
    autoTable(doc, {
      html: '#tbroles', // Selecciona la tabla por su ID
      startY: 20, // Define la posición inicial en Y
    });
    // Guardar el PDF con un nombre
    doc.save('ListaRoles.pdf');
  }
}