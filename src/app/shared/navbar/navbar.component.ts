import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService,private router:Router) {
  }

  isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }

  isTechnician(): boolean {
    return this.authService.getRole() === 'technician';
  }

  isUser(): boolean {
    return this.authService.getRole() === 'user';
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(['login']);
  }

}
