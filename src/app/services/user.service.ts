import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../models/user.model";
import {AuthService} from "./auth.service";
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4000/users';  // L'URL de votre API

  constructor(private http: HttpClient,private authService:AuthService) {}

  // Créer un utilisateur
  createUser(user: User): Observable<User> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Ajout du token au header Authorization
    });
    return this.http.post<User>(this.apiUrl, user,{ headers });
  }

  // Mettre à jour un utilisateur
  updateUser(id: string, user: User): Observable<User> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Ajout du token au header Authorization
    });
    return this.http.put<User>(`${this.apiUrl}/${id}`, user,{ headers });
  }

  // Récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Ajout du token au header Authorization
    });
    const users = this.http.get<User[]>(this.apiUrl,{ headers });

    return users;
  }

  // Récupérer un utilisateur par son ID
  getUser(id: string): Observable<User> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Ajout du token au header Authorization
    });
    return this.http.get<User>(`${this.apiUrl}/${id}`,{headers});
  }

  // Supprimer un utilisateur
  deleteUser(id: string): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Ajout du token au header Authorization
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers });
  }
}
