import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersListComponent } from './components/users-list/users-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: UsersListComponent },
  { path: 'user/:idAlfa', component: UserDetailComponent },
  { path: 'user/:idAlfa/updateuser', component: FormComponent },
  { path: 'newuser', component: FormComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
