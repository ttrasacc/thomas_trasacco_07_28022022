import express, { NextFunction } from 'express';
import prisma  from "../../../config.prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../../../config.environment';
import { validateEmail } from './user.util';
import { User, NewUserData, JwtModel } from './user.model';

export const userController: express.Router = express();

userController.get('/currentUserInfo', async (req: express.Request, res: express.Response, next: NextFunction) => {
	try {
	  	const user = await prisma.user.findUnique({
			where: {
				email: req.email
			},
			select: {
				id: true,
				email: true,
				username: true,
				permissions: true,
			}
		});
		res.json(user);
	} catch (error) {
		console.error(error);
		next({ ...error, status: 500, message: "Erreur lors de la récupération des informations de l'utilisateur." });
	}
  });
  


userController.post('/login', async (req: express.Request, res: express.Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				  email: email
			}
		});
		if (!user) return next({ status: 401, message: "Nom d'utilisateur ou mot de passe incorrect." });
		if (!(await bcrypt.compare(String(password), user.hashed_password))) return next({ status: 401, message: "Nom d'utilisateur ou mot de passe incorrect." });
		
		const jwtModel: JwtModel = {
			email: String(email)
		};
		const accessToken = jwt.sign(jwtModel, env.ACCESS_TOKEN_SECRET, { expiresIn: '60d' });
		let { hashed_password, ...userWithoutPassword } = user;
		res.json({ accessToken,  userWithoutPassword });

	} catch (error) {
		console.error(error);
	  	next({ ...error, status: 500, message: "Erreur lors de l'authentification." });
	}
  });
  
  userController.post('/register', async (req: express.Request, res: express.Response, next: NextFunction) => {
	try {
		const newUser: NewUserData = req.body;
		if (!validateEmail(newUser.email)) return next({ status: 500, message: "Invalid email or id_client." });
		const createdUser: User = await prisma.user.create({
			data: {
				email: newUser.email,
				username: newUser.email,
				hashed_password: await bcrypt.hash(newUser.password, 10),
				permissions: 5
			},
			select: {
				id: true,
				email: true,
				username: true,
				permissions: true,
			}
		});
		res.status(200).json(createdUser);	
	} catch (error) {
		console.error(error);
		next({ error, status: 500, message: "Error when adding new user." });
	}
  });

  userController.post('/resetPassword', async (req: express.Request, res: express.Response, next: NextFunction) => {
	try {
	  const email  = req.body.email;
	  const newPassword = req.body.newPassword
  
	  const user = await prisma.user.findUnique({
		where: {
		  email: email
		}
	  });
	  if (!user) return next({ status: 401, message: "L'adresse email ne correspond à auncun compte utilisateur." });
	  const updatedUser = await prisma.user.update({
		where: {
		  email: user.email
		},
		data: {
		  hashed_password: await bcrypt.hash(newPassword, 10)
		}
	  });
	  res.status(200).json("Votre mot de passe a été modifié.");
	} catch (error) {
	  next({ error, status: 500, message: "Erreur lors du changement de mot de passe."})
	}
  });
