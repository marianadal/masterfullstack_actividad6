import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User | any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Cuando cargue el componente capturamos la ruta activa
    this.activatedRoute.params.subscribe(async (params: any) => {
      let userId: string = params.idAlfa;
      console.log(params.idAlfa);
      try {
        let response = await this.usersService.getById(userId);
        console.log(response);
        this.user = response;
      } catch (error) {
        console.log(error);
      }
      // this.user = this.usersService.getById(userId);
      //// poner alerta si el usuario no existe
    });
  }

  deleteUser(id: string | undefined): void {
    if (id) {
      Swal.fire({
        title: `Vas a borrar el usuario ${this.user.first_name} con id ${this.user._id} '¿Estás seguro?'`,
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
