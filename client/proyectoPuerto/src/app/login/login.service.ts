import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlApi = "http://localhost:8080/server/app/controller/usuariosController.php";

  currentUsername: string = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private _usersService: UsersService) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('tokenRemember') || !!localStorage.getItem('token') ;
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

}
