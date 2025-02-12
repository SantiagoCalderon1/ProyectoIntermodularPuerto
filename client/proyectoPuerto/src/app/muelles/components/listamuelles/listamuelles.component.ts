import { Component } from '@angular/core';
import { MuellesService } from '../../muelles.service';
import { Muelle } from '../../muelle';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Rol } from '../../../roles/rol';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-listamuelles',
  standalone: false,

  templateUrl: './listamuelles.component.html',
  styleUrl: './listamuelles.component.css'
})
export class ListamuellesComponent {
  constructor(private listamuellesService: MuellesService, private _appService: AppService) { }
  muelles: Muelle[] = [];
  public roles: Rol[] = [];
  public rol: number | null = null; // Para controlar el acceso según el rol del usuario
  public selectedMuelle: number = 0;
  muellesSeleccionados: number[] = [];

  ngOnInit() {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
    this.listamuellesService.obtengoMuellesApi().subscribe({
      next: (resultado) => {
        this.muelles = resultado.data;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });

    this.selectedMuelle = 0; // Inicializar la selección de muelle en 0
  }

  descargarPDF() {
    const doc = new jsPDF(); // Crear instancia de jsPDF
    // Agregar título o texto opcional
    doc.text('Lista de Muelles Exportada', 14, 10);
    // Seleccionar la tabla y convertirla a un formato adecuado
    autoTable(doc, {
      html: '#tbmuelles', // Selecciona la tabla por su ID
      startY: 20, // Define la posición inicial en Y
    });
    // Guardar el PDF con un nombre
    doc.save('ListaMuelles.pdf');
  }

  selectMuelle(nummuelle: number, event: any) {
    this.selectedMuelle = event.target.checked ? nummuelle : 0;
  }

  // Método que se ejecuta cuando un checkbox cambia
  onCheckboxChange(event: any, nummuelle: number): void {
    if (event.target.checked) {
      // Si el checkbox está marcado, decidimos qué hacer:
      // Si ya hay uno seleccionado, lo asignamos a selectedMuelle (caso de único muelle seleccionado)
      if (this.muellesSeleccionados.length === 0) {
        this.selectedMuelle = nummuelle;
      }
    } else {
      // Si el checkbox se desmarca, eliminamos el ID de la lista de seleccionados
      this.muellesSeleccionados = this.muellesSeleccionados.filter(id => id !== nummuelle);

      // Si desmarcamos el muelle seleccionado, ponemos selectedMuelle en null
      if (this.selectedMuelle === nummuelle) {
        this.selectedMuelle = 0;
      }
    }
  }

  // Método que verifica si un muelle está seleccionado
  isChecked(id: number): boolean {
    // Si estamos manejando la selección múltiple, buscamos en el array de seleccionados
    return this.selectedMuelle === id || this.muellesSeleccionados.includes(id);
  }

}