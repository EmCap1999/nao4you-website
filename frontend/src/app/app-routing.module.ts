import { NgModule } from '@angular/core'

import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './_authentication/login/login.component'
import { RegisterComponent } from './_authentication/register/register.component'
import { ProfileComponent } from './_authentication/profile/profile.component'

const routes: Routes = [
  { path: '**', redirectTo: 'login' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
