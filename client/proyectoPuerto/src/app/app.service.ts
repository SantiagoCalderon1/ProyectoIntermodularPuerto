import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private rolSubject = new BehaviorSubject<number | null>(null);
  rol$ = this.rolSubject.asObservable();

  constructor() {
    this.loadRol();
  }

  loadRol() {
    const storedRol = localStorage.getItem('token');
    const rol = storedRol ? parseInt(storedRol, 10) : null;
    this.rolSubject.next(rol);
  }

  setRol(rol: number) {
    localStorage.setItem('token', rol.toString());
    this.rolSubject.next(rol);
  }

  logout() {
    localStorage.removeItem('token');
    this.rolSubject.next(null);
  }
}
