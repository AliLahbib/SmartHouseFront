import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Device} from "../models/device.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'http://localhost:4000/devices';

  constructor(private http: HttpClient,private authService: AuthService) {}

  getDeviceById(id:String):Observable<Device> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Ajout du token au header Authorization
    });
    return this.http.get<Device>(`${this.apiUrl}/${id}`,{ headers });
  }

  getDevices(): Observable<Device[]> {
    const token = this.authService.getToken();
    console.log("token from get devices",token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Ajout du token au header Authorization
    });
    return this.http.get<Device[]>(this.apiUrl,{ headers });
  }

  createDevice(device: Device): Observable<Device> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Ajout du token au header Authorization
    });
    return this.http.post<Device>(this.apiUrl, device,{ headers });
  }

  turnOnDevice(id: string): Observable<Device> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Ajout du token au header Authorization
    });

    return this.http.put<Device>(`${this.apiUrl}/${id}/on`,{}, { headers });
  }

  turnOffDevice(id: string): Observable<Device> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Ajout du token au header Authorization
    });
    return this.http.put<Device>(`${this.apiUrl}/${id}/off`,{}, { headers });
  }
  updateDevice(id: string, device: Device): Observable<Device> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Ajout du token au header Authorization
    });
    return this.http.put<Device>(`${this.apiUrl}/${id}`, device,{ headers } );
  }


  deleteDevice(id: string): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Ajout du token au header Authorization
    });
    console.log("debug from deleteDevice in component ",id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers });
  }
}
