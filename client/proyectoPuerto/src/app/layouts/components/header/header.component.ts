import { Component } from '@angular/core';
import { AppService } from '../../../app.service';


@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  rol: number | null = null;
  rutaBreadCrumb: any[] = [];

  constructor(private _appService: AppService
  ) { }

  ngOnInit(): void {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });

    this._appService.ruta$.subscribe(ruta => {
      if (ruta && typeof ruta === 'string') {
        this.rutaBreadCrumb = ruta.split(',');
      } else {
        this.rutaBreadCrumb = [];
      }
      console.log(this.rutaBreadCrumb);
    });
    
    //this.rutaBreadCrumb = this._appService.ruta.split(',');
  }

}