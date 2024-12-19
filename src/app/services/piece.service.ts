import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piece } from '../models/piece.model';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class PieceService {
  private apiUrl = 'http://localhost:4000/pieces';

  constructor(private http: HttpClient,private authService:AuthService) { }

  createPiece(piece: Piece): Observable<Piece> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<Piece>(this.apiUrl, piece,{ headers });
  }

  updatePiece(id: string, piece: Piece): Observable<Piece> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<Piece>(`${this.apiUrl}/${id}`, piece,{ headers });
  }

  getPieces(): Observable<Piece[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Piece[]>(this.apiUrl,{ headers });
  }


  deletePiece(id: string): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers });
  }

  getPieceById(pieceId: string) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Piece>(`${this.apiUrl}/${pieceId}`,{ headers });
  }
}
