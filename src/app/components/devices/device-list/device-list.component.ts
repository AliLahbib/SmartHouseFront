import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../../services/device.service';
import { Device } from '../../../models/device.model';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];

  constructor(private deviceService: DeviceService,private authService:AuthService,private router:Router) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDevices().subscribe(devices => {
      this.devices = devices;
    });
  }

  turnOnDevice(id: string): void {
    this.deviceService.turnOnDevice(id).subscribe(() => {
      this.loadDevices();
    });
  }

  turnOffDevice(id: string): void {
    this.deviceService.turnOffDevice(id).subscribe(() => {
      this.loadDevices();
    });
  }


  createDevice(): void {
    this.router.navigate(['/devices/create']);
  }

  editDevice(id: string): void {
    this.router.navigate(['/devices/edit', id]);
  }

  deleteDevice(_id: string):void {
    if(confirm("Êtes-vous sûr de vouloir supprimer cette appareil ?")){
      this.deviceService.deleteDevice(_id).subscribe(() => {
        this.loadDevices();
      })
    }

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
