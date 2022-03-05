import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { environment } from './environments/environment';

export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercepted")
    if (req.url.endsWith('/login') || req.url.endsWith('/register')) return next.handle(req).pipe(map(res => this.handleLoginResponse(res)));
    const authorizedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.cookieService.get(environment.cookieName)) });
    return next.handle(authorizedRequest);
  }

  handleLoginResponse(response: HttpEvent<any>): HttpEvent<any> {
    if (response instanceof HttpResponse) {
      this.cookieService.set(environment.cookieName, response.body.accessToken, { sameSite: 'Strict', secure: true, path: '/' });
      delete response.body.accessToken;
    }
    console.log("cookie créé")
    return response;
  }
}
