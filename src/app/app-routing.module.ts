import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './Services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo:'/register',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo:'/register'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
