import { Injectable } from '@angular/core';
import { USERPAGE } from '../db/users.db';
import { UserPage } from '../interfaces/user-page.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userPage: UserPage = USERPAGE;

  constructor() {}

  getAll(): User[] {
    return this.userPage.results;
  }
  getById(id: number): User | any {
    return this.getAll().find((user) => user.id === id);
  }
}
