
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import RecipeController from "../controllers/RecipeController";


export class BrowseRoute extends BaseRoute {
    protected recipes: any;

    public static create(router: Router) {
        router.get("/browse", RecipeController.retrieveRecipes);
    }

    constructor() {
        super();
    }

}
