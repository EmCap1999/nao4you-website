import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    NgxIntlTelInputModule
  ],
  providers: [provideHttpClient(), httpInterceptorProviders, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
