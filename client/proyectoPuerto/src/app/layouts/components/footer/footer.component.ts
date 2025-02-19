import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-footer',
  standalone: false,

  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  rol: number | null = null;

  constructor(private router: Router, private _appService: AppService
  ) { }

  ngOnInit(): void {
    this._appService.rol$.subscribe(rol => {
      this.rol = rol;
    });
  }

}
