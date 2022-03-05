import { Author } from "./author.model";
import { Category } from "./category.model";

export interface Article {
  id:							    string;
  creationDate:       Date;
  author:             Author;
	title:					    string;
	body:						    string;
  commentsCount:      number;
  category?:          Category;
}

export interface ArticleData {
  title:          string;
  body:           string;
}

export interface Comment {
  id:                 string;
  author:             Author;
  body:               string;
  creationDate:       string;
  articleTarget?:     string;
  commentTarget?:     string;
  commentsCount:      number;
}

export interface CommentData {
  idArticle:      string;
  body:           string;
}
