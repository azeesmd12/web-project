import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: 'signup', component: LoginComponent,
    children: [{ path: '', component: SignUpComponent }]
},
{
  path: 'signin', component: LoginComponent,
  children: [{ path: '', component: SignInComponent }]
},
{
  path: 'home/customer', component: HomeComponent,canActivate:[AuthGuard]
},
{
  path: 'home/admin', component: AdminComponent,canActivate:[AuthGuard]
},
{
    path: '', redirectTo: '/signin', pathMatch: 'full'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
