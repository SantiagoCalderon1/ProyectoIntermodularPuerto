import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _appService: AppService,
  ) { }

  ngOnInit(): void {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
  }

  private updateBreadcrumb(): void {
  }
}
