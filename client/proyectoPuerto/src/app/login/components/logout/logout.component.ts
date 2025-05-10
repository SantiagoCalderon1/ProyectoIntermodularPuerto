import { Component } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-logout',
  standalone: false,

  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private _loginService: LoginService, private _appService: AppService, private _route: Router, private toastr: ToastrService) { }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenRemember');
    localStorage.removeItem('username');


    this.toastr.success('Has salido la aplicación correctamente', 'Hasta pronto');
  }

  loginAgain() {
    this._route.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
