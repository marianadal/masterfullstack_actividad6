import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://peticiones.online/api/users';
  constructor(private httpClient: HttpClient) {}

  getAll(page: number = 1): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}?page=${page}`)
    );
  }

  getById(id: string): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}/${id}`));
  }

  create(user: User): Promise<any> {
    /// any en promesa ????
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, user));
  }

  update(user: User): Promise<User> {
    return lastValueFrom(
      this.httpClient.put<User>(`${this.baseUrl}/${user._id}`, user)
    );
  }

  delete(id: string): Promise<User> {
    return lastValueFrom(this.httpClient.delete<User>(`${this.baseUrl}/${id}`));
  }
}
