import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  urlApi = "http://localhost:8080/server/app/controller/usuariosController.php";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<any> {
    return this.http.get(`${this.urlApi}/users`);
  }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.urlApi}/user/${username}`);
  }

  insertNewUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/insert`, JSON.stringify(user), this.httpOptions);
  }

  updateUser(username: string, user: User): Observable<any> {
    console.log(JSON.stringify(user));
    console.log(`${this.urlApi}/update/${username}`);
    return this.http.put<any>(`${this.urlApi}/update/${username}`, JSON.stringify(user), this.httpOptions);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.urlApi}/delete/${username}`);
  }
}
