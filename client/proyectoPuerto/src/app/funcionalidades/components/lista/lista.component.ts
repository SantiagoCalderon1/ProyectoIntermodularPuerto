import { Component } from '@angular/core';
import { FuncionalidadesService } from '../../funcionalidades.service';
import { Funcionalidad } from '../../funcionalidad';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-lista',
  standalone: false,

  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  constructor(private _funcionalidadesService: FuncionalidadesService) { }
  funcionalidades: Funcionalidad[] = [];
  
  ngOnInit() {
    this._funcionalidadesService.obtengoFuncionalidadesApi().subscribe({
      next: (resultado) => {
      this.funcionalidades = resultado.data; // Almacena las funcionalidades en el array
      },
      error: (error) => {
        // console.error('Error:', error); // Muestra el error en consola
      }
    });
  }
  descargarPDF() {
    const doc = new jsPDF(); // Crear instancia de jsPDF
    // Agregar título o texto opcional
    doc.text('Lista de Funcionalidades Exportada', 14, 10);
    // Seleccionar la tabla y convertirla a un formato adecuado
    autoTable(doc, {
      html: '#tbfuncionalidades', // Selecciona la tabla por su ID
      startY: 20, // Define la posición inicial en Y
    });
    // Guardar el PDF con un nombre
    doc.save('ListaFuncionalidades.pdf');
  }
}
