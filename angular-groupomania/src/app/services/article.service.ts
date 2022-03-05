import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article, ArticleData, Comment, CommentData } from '../models/article.model';
import { lastValueFrom, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = environment.backendUrl;
  private displayableArticles: Article[] = [];
  private displayableArticlesSubject = new ReplaySubject<Article[]>(1);

  constructor(private httpClient: HttpClient) {
    lastValueFrom(this.displayArticlesInRange(0, 3));
  }

  getDisplayableArticlesObs() {
    return this.displayableArticlesSubject.asObservable();
  }

  getRelatedComments(idArticle: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.apiUrl + "/article/relatedComments/" + idArticle);
  }

  displayArticlesInRange(startRange, endRange): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.apiUrl}/article/inRange/${startRange}/${endRange}`).pipe(map(articles => {
      this.displayableArticles = this.displayableArticles.concat(articles);
      this.displayableArticlesSubject.next(this.displayableArticles);
      return articles;
    }));
  }

  createArticle(newArticleData: ArticleData) {
    return this.httpClient.post<Article>(this.apiUrl + "/article/new", newArticleData).pipe(map(newArticle => {
      this.displayableArticles.unshift(newArticle);
      this.displayableArticlesSubject.next(this.displayableArticles);
      return newArticle;
    }));
  }

  createComment(newCommentData: CommentData): Observable<Comment> {
    return this.httpClient.post<Comment>(this.apiUrl + "/comment/new", newCommentData);
  }

}
