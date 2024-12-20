import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(  private fb: FormBuilder,
                private authService: AuthService,
                private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response: any) => {
          console.log(response);
          this.authService.saveToken(response.token);
          this.authService.saveRole(response.user.role);

          this.router.navigate(['/']); // Redirige vers la page d'accueil
        },
        error: (error) => {

            this.errorMessage = error.error.message || 'Server Error';
          }

      });
    }
  }
}
