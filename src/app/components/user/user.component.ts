import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() userInCard: User | any;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {}

  deleteUser(id: string | undefined): void {
    if (id) {
      Swal.fire({
        title: `Vas a borrar el usuario ${this.userInCard.first_name} con id ${this.userInCard._id} '¿Estás seguro?'`,
        text: 'Esta acción no tiene vuelta a atrás',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡bórralo!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            let response = await this.usersService.delete(id);
            console.log(response);
            if (response._id) {
              Swal.fire('¡Borrado!', 'El usuario ha sido borrado.', 'success');
              this.router.navigate(['/home']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo ha ido mal! No se ha podido borrar el usuario',
              });
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Algo ha ido mal! No se ha podido borrar el usuario',
            });
          }
        }
      });
    }
  }
}
