import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {PieceService} from "../../services/piece.service";
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userCount: number = 0;
  pieceCount: number = 0;
  deviceCount: number = 0;
  recentEvents: string[] = [];

  constructor(private authService:AuthService, private userService:UserService,private pieceService:PieceService, private deviceService : DeviceService) { }

  ngOnInit(): void {

   this.userService.getUsers().subscribe(data=>this.userCount=data.length); // Exemple : Nombre d'utilisateurs
    this.deviceService.getDevices().subscribe(data=>this.deviceCount=data.length);
    this.pieceService.getPieces().subscribe(data=>this.pieceCount=data.length);
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
}
