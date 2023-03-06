import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';

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
    private usersService: UsersService,
    private alertsService: AlertsService
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
          this.alertsService.createAlertUpdateError();
        }
      }
    });
  }

  async getDataForm() {
    let user: User = this.formModel.value;
    if (this.userUpdate) {
      //Actualizo el usuario
      user._id = this.userUpdate._id;
      try {
        let response = await this.usersService.update(user);
        if (response._id) {
          this.alertsService.createAlertUpdateOk(response);
        } else {
          this.alertsService.createAlertUpdateError();
        }
      } catch (error) {
        this.alertsService.createAlertUpdateError();
      }
    } else {
      //Creo un nuevo usuario
      try {
        let response = await this.usersService.create(user);
        if (response.id) {
          this.alertsService.createAlertCreateOk(response);
          this.router.navigate(['/home']);
        } else {
          this.alertsService.createAlertCreateError();
        }
      } catch (error) {
        this.alertsService.createAlertCreateError();
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
