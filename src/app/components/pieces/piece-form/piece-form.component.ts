import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user.model";
import {PieceService} from "../../../services/piece.service";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-piece-form',
  templateUrl: './piece-form.component.html',
  styleUrls: ['./piece-form.component.css']
})
export class PieceFormComponent implements OnInit {
  pieceForm: FormGroup;
  pieceId: string | null = null;
  isEditing = false;
  users: User[] = []; // Liste des utilisateurs disponibles

  constructor(
    private fb: FormBuilder,
    private pieceService: PieceService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pieceForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      floor: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]

    });
  }

  ngOnInit(): void {
    this.loadUsers(); // Charger les utilisateurs pour la sélection
    console.log("debug from init piece form");
    this.pieceId = this.route.snapshot.paramMap.get('id');
    if (this.pieceId) {
      this.isEditing = true;
      this.pieceService.getPieceById(this.pieceId).subscribe(piece => {
        this.pieceForm.patchValue({
          name: piece.name,
          type: piece.type,
          floor: piece.floor,

        });
      });
    }
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit(): void {
    if (this.pieceForm.valid) {
      const pieceData = { ...this.pieceForm.value };

      if (this.isEditing && this.pieceId) {
        this.pieceService.updatePiece(this.pieceId, pieceData).subscribe(() => {
          this.router.navigate(['/pieces']);
        });
      } else {
        this.pieceService.createPiece(pieceData).subscribe(() => {
          this.router.navigate(['/pieces']);
        });
      }
    }
  }
}
