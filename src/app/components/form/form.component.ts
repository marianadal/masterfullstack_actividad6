import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formModel: FormGroup;
  userUpdate: User | any;
  title: string = 'Nuevo';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {
    this.formModel = new FormGroup(
      {
        first_name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        last_name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
        ]),
        image: new FormControl('', [
          Validators.required,
          Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/),
        ]),
      },
      []
    );
  }

  ngOnInit(): void {
    //Cuando cargue el componente capturamos la ruta activa para saber si venimos de 'nuevo-usuario' o de 'actualizar-usuario' y cargar los datos del usuario a actualizar
    this.activatedRoute.params.subscribe(async (params: any) => {
      let userId: string = params.idAlfa;
      if (userId) {
        this.title = 'Actualizar';
        try {
          this.userUpdate = await this.usersService.getById(userId);
          this.formModel.setValue({
            first_name: this.userUpdate.first_name,
            last_name: this.userUpdate.last_name,
            email: this.userUpdate.email,
            image: this.userUpdate.image,
          });
          this.formModel.markAllAsTouched();
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  async getDataForm() {
    let user: User = this.formModel.value;
    console.log(user);
    if (this.userUpdate) {
      //Actualizo el usuario
      user._id = this.userUpdate._id;
      try {
        let response = await this.usersService.update(user);
        console.log(response);
        if (response._id) {
          Swal.fire(
            `Usuario ${response.first_name} con id ${this.userUpdate._id} se ha actualizado correctamente`
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo ha ido mal! No se ha podido actualizar el usuario',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo ha ido mal! No se ha podido actualizar el usuario',
        });
      }
    } else {
      //Creo un nuevo usuario
      try {
        let response = await this.usersService.create(user);
        console.log(response);
        if (response.id) {
          Swal.fire(
            `Usuario ${response.first_name} con id ${response.id} se ha creado correctamente`
          );
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo ha ido mal! No se ha podido crear el usuario',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo ha ido mal! No se ha podido crear el usuario',
        });
      }
    }
  }

  checkControl(controlName: string, controlError: string): boolean {
    if (
      this.formModel.get(controlName)?.hasError(controlError) &&
      this.formModel.get(controlName)?.touched
    ) {
      return true;
    }
    return false;
  }
}
