import { Component } from '@angular/core';
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      console.log("debug users : ",users.length);
      this.users = users;
    });
  }

  deleteUser(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();  // Recharger la liste après la suppression
      });
    }
  }

  editUser(user: User): void {
    console.log("clicked update",user._id);
    this.router.navigate(['/users/edit', user._id]);
  }
  createUser(): void {
    this.router.navigate(['/users/create']);
  }
}
