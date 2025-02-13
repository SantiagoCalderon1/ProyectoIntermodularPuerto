import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  //url local
  //urlApi = "http://localhost:8080/server/app/controller/usuariosController.php";
  
  urlApi = "https://puerto.proyectos-2daw.es/app/controller/usuariosController.php";

  currentUsername: string = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private _usersService: UsersService,    private _appService: AppService,) { }

  isLoggedIn(): boolean {
    return  !!localStorage.getItem('token');
  }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.urlApi}/user/${username}`);
  }

  login(username: string, password: string): Observable<any> {
    const body = {
      "usuario": username,
      "password": password
    }
    return this.http.post<any>(`${this.urlApi}/login`, JSON.stringify(body), this.httpOptions);
  }

  register(body: any) {
    return this.http.post<any>(`${this.urlApi}/insert`, JSON.stringify(body), this.httpOptions);
  }

  setTokenRemember(username: string, rememberme: boolean) {
    if (rememberme) {
      localStorage.setItem('tokenRemember', '123456789');
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('tokenRemember');
      localStorage.removeItem('username');
    }
  }

  setCurrentRol(username: string) {
    this.getUser(username).subscribe({
      next: (response) => {
        if (response.success) { // esto debe ser true
          this._appService.setRol(response.data[0].rol);
        }
      },
      error: (error) => {
        //console.log(error, 'Error al obtener el rol del usuario');
      }
    });
  }

}
