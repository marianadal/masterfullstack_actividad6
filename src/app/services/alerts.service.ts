import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}

  createAlertCreateOk(response: User): void {
    Swal.fire({
      title: '¡Usuario creado!',
      text: `Usuario ${response.first_name} con id ${response.id} se ha creado correctamente`,
      icon: 'success',
    });
  }

  createAlertCreateError(): void {
    this.createAlertError('¡Algo ha ido mal! No se ha podido crear el usuario');
  }

  createAlertUpdateOk(response: User): void {
    Swal.fire({
      title: '¡Usuario actualizado!',
      text: `Usuario ${response.first_name} con id ${response._id} se ha actualizado correctamente`,
      icon: 'success',
    });
  }

  createAlertUpdateError(): void {
    this.createAlertError(
      '¡Algo ha ido mal! No se ha podido actualizar el usuario'
    );
  }

  getConfirmDelete(user: User): Promise<SweetAlertResult> {
    return Swal.fire({
      title: `Vas a borrar el usuario ${user.first_name} con id ${user._id} '¿Estás seguro?'`,
      text: 'Esta acción no tiene vuelta a atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórralo!',
    });
  }

  createAlertDeleteOk(): void {
    Swal.fire({
      title: '¡Borrado!',
      text: 'El usuario ha sido borrado.',
      icon: 'success',
    });
  }

  createAlertDeleteError(): void {
    this.createAlertError(
      '¡Algo ha ido mal! No se ha podido borrar el usuario'
    );
  }

  createAlertGetAllError(): void {
    this.createAlertError(
      '¡Algo ha ido mal! No se ha podido recuperar la lista de usuarios'
    );
  }

  createAlertGetByIdError(id: string): void {
    this.createAlertError(
      `¡Algo ha ido mal! No se ha podido recuperar el usuario con id ${id}`
    );
  }

  createAlertError(text: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    });
  }
}
