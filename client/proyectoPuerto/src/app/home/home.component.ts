import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  rol: number | null = null;
  
    constructor(private _appService: AppService
    ) { }
  ngOnInit(): void {
    this._appService.rol$.subscribe(rol => {
      console.log('en home comp se ha rescatado el rol ' + rol);

      this.rol = rol;
    });
  }
}
