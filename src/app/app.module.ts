import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { PieceListComponent } from './components/pieces/piece-list/piece-list.component';
import { PieceFormComponent } from './components/pieces/piece-form/piece-form.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { DeviceFormComponent } from './components/devices/device-form/device-form.component';
import { DeviceListComponent } from './components/devices/device-list/device-list.component';
import { LoginComponent } from './components/auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserFormComponent,
    PieceListComponent,
    PieceFormComponent,
    NavbarComponent,
    DeviceFormComponent,
    DeviceListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, ReactiveFormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
