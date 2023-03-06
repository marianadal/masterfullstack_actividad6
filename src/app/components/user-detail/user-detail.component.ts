import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { UsersService } from 'src/app/services/users.service';
import { SweetAlertResult } from 'sweetalert2';

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
    private router: Router,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    //Cuando cargue el componente capturamos la ruta activa
    this.activatedRoute.params.subscribe(async (params: any) => {
      let userId: string = params.idAlfa;
      try {
        let response: User = await this.usersService.getById(userId);
        if (response._id) {
          this.user = response;
        } else {
          this.alertsService.createAlertGetByIdError(userId);
          this.router.navigate(['/home']);
        }
      } catch (error) {
        this.alertsService.createAlertGetByIdError(userId);
      }
    });
  }

  deleteUser(id: string | undefined): void {
    if (id) {
      let alertUserDelete: Promise<SweetAlertResult> =
        this.alertsService.getConfirmDelete(this.user);
      alertUserDelete.then(async (result) => {
        if (result.isConfirmed) {
          try {
            let response = await this.usersService.delete(id);
            if (response._id) {
              this.alertsService.createAlertDeleteOk();
              this.router.navigate(['/home']);
            } else {
              this.alertsService.createAlertDeleteError();
            }
          } catch (error) {
            this.alertsService.createAlertDeleteError();
          }
        }
      });
    }
  }
}
