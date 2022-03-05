import express, { NextFunction } from "express";
import prisma  from "../../../config.prisma";
import { ARTICLE_DEFAULT_SELECT_QUERY, COMMENT_DEFAULT_SELECT_QUERY, formatArticle, formatComment } from './article.util';

export const articleController: express.Router = express();

articleController.get('/inRange/:start/:end', async (req: express.Request, res: express.Response, next: NextFunction) => {
	try {
		let articlesInRange = await prisma.article.findMany({
			skip: Number(req.params.start),
			take: Number(req.params.end),
			orderBy: { creationDate: 'desc' },
			select: ARTICLE_DEFAULT_SELECT_QUERY
		});
		res.json(articlesInRange.map(formatArticle));
	} catch (error) {
		console.error(error);
		next({ ...error, status: 500, message: "Erreur lors de la récupération des articles suivants." });
	}
});

articleController.get('/relatedComments/:id', async (req: express.Request, res: express.Response, next: NextFunction) => {
	try {
		let relatedComments = await prisma.answer.findMany({
			where: {
				toArticle: req.params.id
			},
			select: COMMENT_DEFAULT_SELECT_QUERY
		});

		res.json(relatedComments.map(formatComment));
	} catch (error) {
		console.error(error);
		next({ ...error, status: 500, message: "Erreur lors de la récupération des commentaires du post." });
	}
});

articleController.post('/new', async (req: express.Request, res: express.Response, next: NextFunction) => {
	try {
		const articleData = req.body;
		let newPost = await prisma.article.create({
			data: {
				creationDate: new Date(),
				user: {
					connect: {
						email: req.email
					}
				},
				title: articleData.title,
				body: articleData.body
			},
			select: ARTICLE_DEFAULT_SELECT_QUERY
		});
		res.json(formatArticle(newPost));
	} catch (error) {
		console.error(error);
		next({ ...error, status: 500, message: "Erreur lors de la création du post." });
	}
});