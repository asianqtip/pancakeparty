
import { Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import AuthController from "../controllers/AuthController";



export class LoginRoute extends BaseRoute {

    public static create(router: Router) {
        router.get("/login", (req: Request, res: Response) => {
            new LoginRoute().login(req, res);
        });
        router.post("/login", AuthController.login);
    }

    constructor() {
        super();
    }

    public login(req: Request, res: Response) {
        this.render(req, res, "login", { errors: req.flash('errors'),  success: req.flash('success') });
    }
}
