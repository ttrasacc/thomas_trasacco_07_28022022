import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUserObs().subscribe(user => {
      this.currentUser = user;
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
