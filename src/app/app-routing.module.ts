import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import {PieceListComponent} from "./components/pieces/piece-list/piece-list.component";
import {PieceFormComponent} from "./components/pieces/piece-form/piece-form.component";

import {DeviceListComponent} from "./components/devices/device-list/device-list.component";
import {DeviceFormComponent} from "./components/devices/device-form/device-form.component";
import {AuthGuard} from "./services/auth.guard";
import {LoginComponent} from "./components/auth/login/login.component";

// Définir les routes ici
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/create', component: UserFormComponent },
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: 'pieces', component: PieceListComponent },
  { path: 'pieces/create', component:  PieceFormComponent},
  { path: 'pieces/edit/:id', component: PieceFormComponent },
  { path: 'devices', component:DeviceListComponent},
  { path: 'devices/create' , component:  DeviceFormComponent },
  { path: 'devices/edit/:id' , component:  DeviceFormComponent },
  { path: '**', redirectTo: '' } // Pas de slash ici non plus
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule  {}
