import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.backendUrl;
  private currentUser: User;
  private currentUserSub = new ReplaySubject<User>(1);

  constructor(private httpClient: HttpClient,
              private router: Router,
              private cookieService: CookieService) {
    if (this.isCookiePresent()) this.getCurrentUserInfo();
    else this.currentUserSub.next(null);
  }

  getCurrentUserObs(): Observable<User> {
    return this.currentUserSub.asObservable();
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl + "/auth/login", { email, password }).pipe(map( (user: User) => {
      this.currentUser = user;
      this.currentUserSub.next(this.currentUser);
      return user;
    }));
  }

  register(email: string, password: string): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl + "/auth/register", { email, password }).pipe(map(user => {
      this.currentUser = user;
      this.currentUserSub.next(user);
      return user;
    }))
  }

  logout() {
    this.currentUser = null;
    this.currentUserSub.next(null);
    this.cookieService.delete(environment.cookieName, '/');
    this.router.navigateByUrl("/login");
  }

  private getCurrentUserInfo() {
    this.httpClient.get(this.apiUrl + "/auth/currentUserInfo").subscribe((user: User) => {
      this.currentUser = user;
      this.currentUserSub.next(this.currentUser);
    }, _ => {
      this.router.navigateByUrl("/login");
    });
  }

  private isCookiePresent(): boolean {
    return this.cookieService.check(environment.cookieName);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + '/auth/changePassword', {
      password: oldPassword,
      newPassword: newPassword
    });
  }

  resetPassword(username: string): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/auth/resetPassword', { username });
  }


}
