import { Component, OnInit } from '@angular/core';
import { Article, ArticleData, Comment, CommentData } from '../../models/article.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { lastValueFrom } from 'rxjs';
import { formatDate } from '../../utils/date.util';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedArticles: Article[];
  expandedArticle: string = "";
  newPostFormGroup: FormGroup;

  formatDate = formatDate;

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getDisplayableArticlesObs().subscribe(articles => {
      this.displayedArticles = articles;
    });
    this.newPostFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });

  }

  onSubmitNewPost(formValues) {
    const newArticleData: ArticleData = {
      title: formValues.title,
      body: formValues.body
    }
    lastValueFrom(this.articleService.createArticle(newArticleData));
  }

  onScroll(event) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      lastValueFrom(this.articleService.displayArticlesInRange(this.displayedArticles.length, 3));
    }
  }

  onViewComments(articleId: string) {
    this.expandedArticle = this.expandedArticle != articleId ? articleId : "";
  }

}

