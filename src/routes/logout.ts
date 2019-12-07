
import { Router } from "express";
import { BaseRoute } from "./route";
import AuthController from "../controllers/AuthController";



export class LogoutRoute extends BaseRoute {

    public static create(router: Router) {
        router.get("/logout", AuthController.logout);
    }

    constructor() {
        super();
    }
}
