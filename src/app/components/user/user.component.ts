import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AlertsService } from 'src/app/services/alerts.service';
import { UsersService } from 'src/app/services/users.service';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() userInCard: User | any;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {}

  deleteUser(id: string | undefined): void {
    if (id) {
      let alertUserDelete: Promise<SweetAlertResult> =
        this.alertsService.getConfirmDelete(this.userInCard);
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
