import {Component, OnInit} from '@angular/core';
import {Piece} from "../../../models/piece.model";
import {PieceService} from "../../../services/piece.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-piece-list',
  templateUrl: './piece-list.component.html',
  styleUrls: ['./piece-list.component.css']
})
export class PieceListComponent implements OnInit {
  pieces: Piece[] = [];

  constructor(private pieceService: PieceService, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.loadPieces();
  }

  loadPieces(): void {
    this.pieceService.getPieces().subscribe(pieces => {

      this.pieces = pieces;
    });
  }

  deletePiece(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pièce ?')) {
      this.pieceService.deletePiece(id).subscribe(() => {
        this.loadPieces();
      });
    }
  }

  createPiece(): void {
    this.router.navigate(['/pieces/create']);
  }

  editPiece(id: string): void {
    this.router.navigate(['/pieces/edit', id]) ;
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
