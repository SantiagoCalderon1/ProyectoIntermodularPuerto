import { Component } from '@angular/core';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-list',
  standalone: false,

  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  public title: string = "Usuarios";

  users: any[] = [];
  
  public filterSearch: string = '';
  constructor(private _userService: UsersService) { }

  ngOnInit() {
    this._userService.getAllUser().subscribe({
      next: (response) => {
        if (response.success) { // esto debe ser true
          this.users = response.data;
          console.log(response.data);
        } else {
          console.error('Error:', response.exception);
        }
      },
      error: (error) => {
        console.error('Error al recibir datos:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }
}
