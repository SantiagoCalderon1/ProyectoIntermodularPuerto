import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlApi = "http://localhost:8080/server/app/controller/usuariosLoginController.php";

  currentUsername: string = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private _usersService: UsersService) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(password: string, username?: string, email?: string,): Observable<any> {
    const body = {
      "usuario": username,
      //"email": email,
      "password": password
    }
    return this.http.post<any>(`${this.urlApi}/login`, JSON.stringify(body), this.httpOptions);
  }

  register(body: any) {
    
    return this.http.post<any>(`${this.urlApi}/insert`, JSON.stringify(body), this.httpOptions);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLogin(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }

}
