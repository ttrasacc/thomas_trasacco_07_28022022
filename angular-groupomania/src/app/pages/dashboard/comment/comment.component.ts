import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { lastValueFrom, map } from 'rxjs';
import { Comment, CommentData } from 'src/app/models/article.model';
import { ArticleService } from '../../../services/article.service';
import { formatDate } from '../../../utils/date.util';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() idArticle: string;
  displayedComments: Comment[] = [];
  newCommentFormGroup: FormGroup;
  isLoaded = false;

  formatDate = formatDate;
  constructor(private articleService: ArticleService,
              private formBuilder: FormBuilder) { }

  async ngOnInit() {
    this.displayedComments = await lastValueFrom(this.articleService.getRelatedComments(this.idArticle).pipe(map(comments => { return comments ? comments : []; })));
    this.newCommentFormGroup = this.formBuilder.group({
      comment: ['', Validators.required]
    });
    this.isLoaded = true;
  }

  onSubmitNewComment(formValue) {
    const newCommentdata: CommentData = {
      body: formValue.comment,
      idArticle: this.idArticle
    };
    this.articleService.createComment(newCommentdata).subscribe((newComment: Comment) => {
      this.displayedComments.unshift(newComment);
    });
  }
}

