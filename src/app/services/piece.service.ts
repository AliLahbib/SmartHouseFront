import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piece } from '../models/piece.model';

@Injectable({
  providedIn: 'root',
})
export class PieceService {
  private apiUrl = 'http://localhost:4000/pieces';

  constructor(private http: HttpClient) {}

  createPiece(piece: Piece): Observable<Piece> {
    return this.http.post<Piece>(this.apiUrl, piece);
  }

  updatePiece(id: string, piece: Piece): Observable<Piece> {
    return this.http.put<Piece>(`${this.apiUrl}/${id}`, piece);
  }

  getPieces(): Observable<Piece[]> {
    return this.http.get<Piece[]>(this.apiUrl);
  }


  deletePiece(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPieceById(pieceId: string) {
    return this.http.get<Piece>(`${this.apiUrl}/${pieceId}`);
  }
}
