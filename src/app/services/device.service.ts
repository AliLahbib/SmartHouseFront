import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Device} from "../models/device.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'http://localhost:4000/devices';

  constructor(private http: HttpClient) {}

  getDeviceById(id:String):Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/${id}`);
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl);
  }

  createDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(this.apiUrl, device);
  }

  turnOnDevice(id: string): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/${id}/on`, {});
  }

  turnOffDevice(id: string): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/${id}/off`, {});
  }
  updateDevice(id: string, device: Device): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/${id}`, device);
  }


  deleteDevice(id: string): Observable<void> {
    console.log("debug from deleteDevice in component ",id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
