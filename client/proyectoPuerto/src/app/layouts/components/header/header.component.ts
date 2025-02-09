import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';


@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  breadcrumb: string[] = [];
  rol: number | null = null;

  constructor(private router: Router, private _appService: AppService
  ) { }

  ngOnInit(): void {
    this._appService.rol$.subscribe(rol => {
      console.log('en header comp se ha rescatado el rol ' + rol);
      this.rol = rol;
    });
  }

  private updateBreadcrumb(): void {
  }
}
