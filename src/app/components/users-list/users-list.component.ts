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
  currentPage: number = 1;
  totalPages: number = 1;

  //Inyecto la dependencia para que recoja los datos del servicio (como propiedad privada)
  constructor(private usersService: UsersService) {}

  //Cuando el componente esté cargado, necesito llamar al servicio para traer el listado de usuarios
  ngOnInit(): void {
    this.gotoPage();
  }

  async gotoPage(numPage: number = 1): Promise<void> {
    try {
      let response = await this.usersService.getAll(numPage);
      console.log(response);
      this.currentPage = response.page;
      this.totalPages = response.total_pages;
      this.usersList = response.results;
    } catch (error) {
      console.log(error);
    }
  }
}
