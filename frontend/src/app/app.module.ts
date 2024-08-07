import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgOptimizedImage } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_authentication/login/login.component';
import { RegisterComponent } from './_authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './_authentication/profile/profile.component';
import { provideHttpClient } from '@angular/common/http';
import { httpInterceptorProviders } from './_helpers/http.interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage
  ],
  providers: [provideHttpClient(), httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
