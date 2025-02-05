import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
