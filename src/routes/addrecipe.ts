import { Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import RecipeController from "../controllers/RecipeController";
import "../config/passport";
export class AddRecipeRoute extends BaseRoute {

    public static create(router: Router) {
        router.get("/addrecipe", (req: Request, res: Response) => {
            if(req.isAuthenticated()) {
                res.render('addrecipe',{ errors: req.flash('error'),  success:req.flash('success') });
            } else {
                res.redirect('/login')
            }
        });
       router.post("/addrecipe", RecipeController.newRecipe);
    }

    constructor() {
        super();
    }

}
