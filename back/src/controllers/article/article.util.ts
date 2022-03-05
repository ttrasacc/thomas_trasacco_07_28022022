import { Prisma } from "@prisma/client";
import { Article } from "./article.model";
import { Category } from '../../../../angular-groupomania/src/app/models/category.model';
import { Comment } from '../answer/answer.model';

export type ArticleDefaultPayload = Prisma.articleGetPayload<{ select: typeof ARTICLE_DEFAULT_SELECT_QUERY }>;
export type CommentDefaultPayload = Prisma.answerGetPayload<{ select: typeof COMMENT_DEFAULT_SELECT_QUERY }>;

export const ARTICLE_DEFAULT_SELECT_QUERY = Prisma.validator<Prisma.articleSelect>()({
	id: true,
	creationDate: true,
	category: {
		select: {
			label: true
		}
	},
	user: {
		select: {
			id: true,
			username: true
		}
	},
	title: true,
	body: true,
	_count: {
		select: {
			answer: true
		}
	}
	
});

export const COMMENT_DEFAULT_SELECT_QUERY = Prisma.validator<Prisma.answerSelect>()({
	id: true,
	creationDate: true,
	user: {
		select: {
			id: true,
			username: true
		}
	},
	body: true
})

export function formatArticle(articleDefaultPayload: ArticleDefaultPayload): Article {
	return {
		id: articleDefaultPayload.id,
		author: articleDefaultPayload.user,
		creationDate: articleDefaultPayload.creationDate,
		title: articleDefaultPayload.title,
		body: articleDefaultPayload.body,
		commentsCount: articleDefaultPayload._count.answer,
		categoryLabel: articleDefaultPayload.category?.label
	}
}

export function formatComment(commentDefaultPayload: CommentDefaultPayload): Comment {
	return {
		id: commentDefaultPayload.id,
		author: commentDefaultPayload.user,
		creationDate: commentDefaultPayload.creationDate,
		body: commentDefaultPayload.body
	}
}
