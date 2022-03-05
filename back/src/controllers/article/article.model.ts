import { User } from '../user/user.model';

export interface Author {
	id: string;
	username: string;
}

export interface Article {
	id:					string;
	creationDate:       Date;
	author:             Author;
	title:				string;
	body:				string;
	commentsCount:      number;
	categoryLabel:      string;
  }