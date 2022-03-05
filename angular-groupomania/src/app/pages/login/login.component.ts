import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  registerMode = false;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              public dialog : MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUserObs().subscribe(user => {
      if (user) this.router.navigate(['accueil']);
    });
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registerMode) {
      this.authService.register(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe({
        next: (user: User) => {
          this.router.navigateByUrl('accueil');
        }, error: error => {
          this.errorMessage = error.error;
        }
      });
    } else {
      this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe({
        next: (user: User) => {
          this.router.navigateByUrl('accueil');
        }, error: error => {
          this.errorMessage = error.error;
        }
      });
    }
  }

  onSwitchMode() {
    this.registerMode = !this.registerMode;
  }
}
