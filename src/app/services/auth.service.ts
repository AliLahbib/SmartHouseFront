import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private http: HttpClient, private router:Router ) {}

  login(email: string, password: string) {
    return this.http.post('http://localhost:4000/auth/login', { email, password });
  }
  logout() {
    // Supprimer le token local et informer le serveur
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.http.post(`http://localhost:4000/auth/logout`, {}).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveRole(role: string): void {

    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role')||'';
  }


}
