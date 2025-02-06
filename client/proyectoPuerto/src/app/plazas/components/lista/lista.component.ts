import { Component } from '@angular/core';
import { PlazasService } from '../../plazas.service';

@Component({
  selector: 'app-lista',
  standalone: false,
  
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  public data: any[] = [];

  constructor(private plazaService: PlazasService) { }

  ngOnInit(): void {
    this.GET();
  }

  GET(): void {
    this.plazaService.obtengoPlazasApi().subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (error) => {
        console.error('Error en la solicitud', error);
      }
    });
  }
}
