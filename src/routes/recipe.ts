
import { Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import RecipeController from "../controllers/RecipeController";
const ObjectId = require('mongodb').ObjectId;


export class RecipeRoute extends BaseRoute {

    public static create(router: Router) {
        router.get('/recipe', (req: Request, res: Response) => {
            if (req.isAuthenticated()) {
                res.render("recipe", {errors: req.flash('errors'),  success:req.flash('success') } );
            } else {

                req.flash("errors", 'You are not authorized to access that page. Please login');
                res.redirect('/login')
            }
        });

        router.get('/recipe/:name', (req: Request, res: Response) => {
            if (req.isAuthenticated()) {
                RecipeController.getRecipe(req, res);
            } else {
                res.redirect('/login')
            }
        });
        router.post('/recipe/:name/delete', (req: Request, res: Response) => {
            if(req.isAuthenticated()) {
                RecipeController.deleteRecipe(req,res);
            } else {
                res.redirect('/login')
            }
        });
        router.get('/recipe/:name/edit', (req: Request, res: Response) => {
            if(req.isAuthenticated()) {
                RecipeController.geteditRecipe(req,res);
            } else {
                res.redirect('/login')
            }
        });
        router.post('/recipe/:name/edit', (req: Request, res: Response) => {
            if(req.isAuthenticated()) {
                RecipeController.editRecipe(req,res);
            } else {
                res.redirect('/login')
            }
        });

    }

    constructor() {
        super();
    }
}
