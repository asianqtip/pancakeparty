
import { Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import RecipeController from "../controllers/RecipeController";


export class MyAccountRoute extends BaseRoute {
    protected recipes: any;

    public static create(router: Router) {
        router.get("/myaccount", (req: Request, res: Response) => {
            if(req.isAuthenticated()) {
                RecipeController.getAccountRecipes(req,res);
            } else {
                req.flash('errors', 'Not Authorized');
                res.redirect('/login')
            }
        });
    }

    constructor() {
        super();
    }
}
