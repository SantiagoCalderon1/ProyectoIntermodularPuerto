import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/server/app/controller/usuariosLoginController.php'; 

  constructor(private http: HttpClient) {}


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }

  logout() {
    localStorage.removeItem('token');
  }
}
