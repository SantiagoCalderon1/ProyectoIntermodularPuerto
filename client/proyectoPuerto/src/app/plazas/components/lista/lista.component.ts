import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-lista',
  standalone: false,
  
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  public data: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.GET();
  }

  GET(): void {
    this.apiService.getData().subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (error) => {
        console.error('Error en la solicitud', error);
      }
    });
  }
}
