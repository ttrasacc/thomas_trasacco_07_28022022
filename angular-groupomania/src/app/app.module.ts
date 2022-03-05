import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material.module';
import { AuthGuardService } from './services/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { ArticleService } from './services/article.service';
import { HeaderComponent } from './pages/header/header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from './pages/dashboard/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    CommentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NoopAnimationsModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ArticleService,
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, deps: [CookieService] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
