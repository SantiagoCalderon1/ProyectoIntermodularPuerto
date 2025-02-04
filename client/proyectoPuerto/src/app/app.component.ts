import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectoPuerto';
  constructor(private _loginService: LoginService) {}

  isIdentified(){
    return this._loginService.isLoggedIn();
  }
}
