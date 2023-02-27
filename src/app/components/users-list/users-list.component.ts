import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  usersList: User[] = [];

  //Inyecto la dependencia para que recoja los datos del servicio (como propiedad privada)
  constructor(private usersService: UsersService) {}

  //Cuando el componente esté cargado, necesito llamar al servicio para traer el listado de usuarios
  ngOnInit(): void {
    this.usersList = this.usersService.getAll();
    console.log(this.usersList);
  }
}
