import express from "express";
export abstract class CommonRoutesConfig {
	app: express.Application;
	name: string;
	constructor(app: express.Application, name: string) {
		this.app = app;
		this.name = name;
		//Execute the abstract method configureRoutes(). This will attach all the routes to the express application.
		this.configureRoutes();
	}
	getName() {
		return this.name;
	}
	getRouter() {
		return express.Router();
	}
	abstract configureRoutes(): express.Application;
}
