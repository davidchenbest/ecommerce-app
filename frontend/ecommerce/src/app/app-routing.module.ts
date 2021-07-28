import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthService],
    data: { role: 'admin' },
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'registerAdmin',
    component: RegisterAdminComponent,
    canActivate: [AuthService],
    data: { role: 'admin' },
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthService] },
  {
    path: 'editProfile',
    component: EditProfileComponent,
    canActivate: [AuthService],
  },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
