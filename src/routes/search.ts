
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import RecipeController from "../controllers/RecipeController";


export class SearchRoute extends BaseRoute {
    public static create(router: Router) {
        router.get("/search", (req: Request, res: Response) => {
            res.render( "search", { errors: req.flash('errors'),  success:req.flash('success') });
        });
        router.post('/search', (req: Request, res: Response) => {
            RecipeController.queryRecipes(req, res);
        });
    }

    constructor() {
        super();
    }

}