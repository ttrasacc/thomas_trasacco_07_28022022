import express from "express";
import { userController } from "./src/controllers/user/user.controller";
import { articleController } from './src/controllers/article/article.controller';
import { answerController } from './src/controllers/answer/answer.controller';

export const routes: { [route: string]: express.Router } = {
    '/auth': userController,
    '/article': articleController,
    '/comment': answerController
}