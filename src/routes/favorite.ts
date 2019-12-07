
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import RecipeController from "../controllers/RecipeController";


export class FavoriteRoute extends BaseRoute {

    public static create(router: Router) {

        router.post("/favorite", function (req, res) {
            if(req.isAuthenticated()) {
                RecipeController.favoriteRecipe(req, res);
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
