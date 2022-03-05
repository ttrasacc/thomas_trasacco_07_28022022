export interface User {
	id:             string;
	username:       string;
	email:          string;
	permissions:    number;
}

export interface NewUserData {
	email:          string;
	password: 		string;
}

export interface JwtModel {
	email: string
}