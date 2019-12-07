
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import RecipeController from "../controllers/RecipeController";


export class DislikeRoute extends BaseRoute {

    public static create(router: Router) {
        router.post("/dislike", function (req, res) {
            if(req.isAuthenticated()) {
                RecipeController.dislikeRecipe(req, res);
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
