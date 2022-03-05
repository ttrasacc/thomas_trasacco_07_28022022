import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "./config.environment";
import { JwtModel } from './src/controllers/user/user.model';

export function authenticateToken(req: express.Request, res: express.Response, next: NextFunction) {
	if (isExempted(req.path)) return next();
	const authHeader = req.headers.authorization;
	const token = authHeader?.split(' ')[1];
	jwt.verify(token, env.ACCESS_TOKEN_SECRET, (error, user: any) => {
		if (error) return next({ error, status: 403, message: "Erreur d'authentification." });
		req.email = user.email;
		next();
	});
}
  
export function isExempted(url: string): boolean {
	for (let exemptedEndPoint of exemptedEndPoints) {
		if (url.endsWith(exemptedEndPoint)) return true;
	}
	return false;
}

const exemptedEndPoints = [
	'/login',
	'/register',
];
