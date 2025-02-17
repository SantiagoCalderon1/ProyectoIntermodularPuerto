<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
>>>>>>> unionUsuarioRolFuncionalidad
import { AppService } from '../../../app.service';


@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
<<<<<<< HEAD
=======
  @ViewChild('offcanvas') offcanvas!: ElementRef;
  breadcrumb: string[] = [];
>>>>>>> unionUsuarioRolFuncionalidad
  rol: number | null = null;
  rutaBreadCrumb: any[] = [];

<<<<<<< HEAD
  constructor(private _appService: AppService
=======
  constructor(private _appService: AppService, private _route: Router,

>>>>>>> unionUsuarioRolFuncionalidad
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

<<<<<<< HEAD
}
=======
}
>>>>>>> unionUsuarioRolFuncionalidad
