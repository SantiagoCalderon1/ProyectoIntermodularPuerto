import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  urlApi = "http://localhost:8080/server/app/controller/usuariosController.php";

  private userSubject = new BehaviorSubject<any | null>(null);
  public user$: Observable<any | null> = this.userSubject.asObservable();


  constructor(private _usersService: UsersService) {
  }

  setCurrentUser(username: string) {
    this._usersService.getUser(username).subscribe({
      next: (response) => {
        if (response.success) { // esto debe ser true
          this.userSubject.next(response.data[0]); // Se almacena solo en memoria
        }
      },
      error: (error) => {
        console.log(error, 'Error al obtener el usuario');
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }

  unsetCurrentUser() {
    this.userSubject.next(null);
  }

  getUser(): any | null {
    return this.userSubject.value;
  }

}
