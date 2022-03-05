import express, { NextFunction } from "express";
import prisma  from "../../../config.prisma";
import { COMMENT_DEFAULT_SELECT_QUERY, formatComment } from "../article/article.util";
import { CommentData } from './answer.model';

export const answerController: express.Router = express();

answerController.post('/new', async (req: express.Request, res: express.Response, next: NextFunction) => {
	try  {
		const newCommentData: CommentData = req.body;
		const newComment = await prisma.answer.create({
			data: {
				creationDate: new Date(),
				user: {
					connect: {
						email: req.email
					}
				},
				body: newCommentData.body,
				answerToArticle: {
					connect: {
						id: newCommentData.idArticle
					}
				}
			}, select: COMMENT_DEFAULT_SELECT_QUERY
		});
		res.json(formatComment(newComment));
	} catch (error) {
		console.error(error);
		next({ ...error, status: 500, message: "Erreur lors de la création du post." });
	}
});