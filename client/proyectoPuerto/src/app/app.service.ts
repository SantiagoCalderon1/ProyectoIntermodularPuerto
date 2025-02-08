import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private currentRolSubject = new BehaviorSubject<number | null>(null);
  rol$ = this.currentRolSubject.asObservable();

  constructor(private _usersService: UsersService) {
  }

  setCurrentRol(username: string) {
    this._usersService.getUser(username).subscribe({
      next: (response) => {
        if (response.success) { // esto debe ser true
          this.currentRolSubject.next(response.data[0].rol); // Se almacena solo en memoria
        }
      },
      error: (error) => {
        console.log(error, 'Error al obtener el rol del usuario');
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }

  unsetCurrentRol() {
    this.currentRolSubject.next(null);
  }

  getCurrentRol(): number | null {
    return this.currentRolSubject.value;
  }

}
