import { Author } from '../article/article.model';

export interface Comment {
	id:                 string;
	author:             Author;
	body:               string;
	creationDate:       Date;
	articleTarget?:     string;
	commentTarget?:     string;
	commentsCount?:      number;
  }

  export interface CommentData {
	idArticle:		string;
	body: 			string;
  }