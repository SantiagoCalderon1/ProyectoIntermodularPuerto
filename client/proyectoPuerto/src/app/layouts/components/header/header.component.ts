import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';


@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('offcanvas') offcanvas!: ElementRef;
  breadcrumb: string[] = [];
  rol: number | null = null;

  constructor(private _appService: AppService, private _route: Router,

  ) { }

  ngOnInit(): void {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
  }

}
