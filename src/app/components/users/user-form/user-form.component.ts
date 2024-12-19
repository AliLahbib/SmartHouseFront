import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Piece} from "../../../models/piece.model";
import {UserService} from "../../../services/user.service";
import {PieceService} from "../../../services/piece.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() user?: User;  // Utilisateur à éditer, si présent
  @Output() userSaved = new EventEmitter<User>();  // Émetteur pour notifier la sauvegarde

  userForm: FormGroup;
  pieces: Piece[] = [];  // Liste des pièces disponibles
  isEditing = false;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private pieceService: PieceService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''], // Facultatif en édition
      phone: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      role: ['', [Validators.required]],
      pieces: [],  // Liste des pièces associées
    });
  }

  ngOnInit(): void {
    console.log("debug users page");

    // Récupérer l'ID depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId) {
        console.log("mode edit", this.userId);
        this.isEditing = true;

        // Charger les données de l'utilisateur à éditer
        this.userService.getUser(this.userId).subscribe(user => {
          this.userForm.patchValue({
            username: user.username,
            email: user.email,
            phone: user.phone,
            birthday: this.formatDateToInput(user.birthday),
            role: user.role,
            password: '',
            pieces: user.pieces?.map((piece: Piece) => piece._id) || []
          });
        });
      } else {
        console.log("mode create");
      }
    });

    // Charger les pièces
    this.pieceService.getPieces().subscribe((pieces) => {
      this.pieces = pieces;
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      console.log('User Data Submitted:', userData);

      if (this.isEditing && this.userId) {
        if (!userData.password) {
          userData.password = ''; // Force à une chaîne vide
        }
        console.log("user for edit ",userData);
        this.userService.updateUser(this.userId, userData).subscribe((updatedUser) => {
          console.log('User updated successfully', updatedUser);
          this.userSaved.emit(updatedUser);
          this.router.navigate(['/users']);
        });
      } else {
        this.userService.createUser(userData).subscribe((newUser) => {

          this.userSaved.emit(newUser);
          this.router.navigate(['/users']);
        });
      }
    }
  }

  isPieceSelected(pieceId: string | undefined): boolean {
    return this.userForm.value.pieces?.includes(pieceId);
  }
  private formatDateToInput(isoDate: string): string {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ajout du zéro si < 10
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`; // Retourne "yyyy-MM-dd"
  }

}
