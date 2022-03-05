import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { filter, map } from 'rxjs/operators';
import { User } from '../models/user.model';

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getCurrentUserObs()
      .pipe(filter((user: User) => user !== undefined),
        map( (user: User) => {
          if(user === null) {
            console.log("no user")
            this.router.navigateByUrl('login');
            return false;
          } else return true;
        }));
  }
}
