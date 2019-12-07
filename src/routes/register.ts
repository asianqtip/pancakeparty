
import { Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import UserController from "../controllers/UserController";

export class RegisterRoute extends BaseRoute {

    public static create(router: Router) {

        //add register route
        router.get("/register", (req: Request, res: Response) => {
            new RegisterRoute().register(req, res);
        });
        router.post("/register", UserController.newUser);
    }

    constructor() {
        super();
    }

    public register(req: Request, res: Response) {
        this.render(req, res, "register", { errors: req.flash('errors'),  success:req.flash('success') });
    }
}
