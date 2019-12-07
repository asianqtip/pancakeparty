import {Request, Response} from "express";
import {Recipe, Ingredient, Instruction} from "../types";
const ObjectId = require('mongodb').ObjectId;

/** RecipeController()
 *  Manages all request regarding recipes.
 *  Manages interactions of the Recipe Collections of the
 *  database and the application
 *
 */
const DbClient = require("../DbClient");

class RecipeController{

    /** RetrieveRecipes()
     * Connects to database and renders the recipe data for the
     * /browse page
     *
     */
    static retrieveRecipes ( req: Request, res: Response) {
        DbClient.connect()
            .then((db: any) => {
                return db!.collection("Recipes").find().toArray();
            })
            .then((Recipes: any) => {
                res.status(200).render("browse", { Recipes: Recipes, errors: req.flash('errors'),  success:req.flash('success') } );

            })
            .catch((err: any) => {
                req.flash('errors', "Oops! Something went wrong");
                res.status(400).redirect("/login");
            })
    }
    static queryRecipes ( req: Request, res: Response) {
        DbClient.connect()
            .then((db: any) => {
                return db!.collection("Recipes").find({ $or : [{ title: { $regex: req.body.query, $options: 'i' }}, { "ingredients.name" : { $regex: req.body.query, $options : 'i' }}]}).toArray();
            })
            .then((Recipes: any) => {
                if (Recipes.length>0) {
                    if(req.body.sort == 'Highest Likes')
                        Recipes.sort((a, b) => (a.rating.Upvotes< b.rating.Upvotes) ? 1 : -1);
                    else if(req.body.sort == 'Highest Dislikes')
                        Recipes.sort((a, b) => (a.rating.Downvotes < b.rating.Downvotes) ? 1 : -1);
                    else if(req.body.sort == 'Recipe Title Z-A')
                        Recipes.sort((a, b) => (a.title < b.title) ? 1 : -1);
                    else if(req.body.sort == 'Recipe Title A-Z')
                        Recipes.sort((a, b) => (a.title > b.title) ? 1 : -1);
                    res.render("search", {
                        Recipes: Recipes,
                        query: req.body.query,
                        sort: req.body.sort,
                        errors: req.flash('errors'),
                        success: req.flash('success')
                    });
                }
                else
                    res.status(204).render("search", { query: req.body.query, errors: req.flash('errors'),  success:req.flash('success') } );

            })
            .catch((err: any) => {
                req.flash('errors', "Oops! Something went wrong");
                res.status(400).redirect("/")
            })
    }
    static newRecipe = (req: Request, res: Response ) =>{
        let {rtitle, esttime, name, quantity, unit, optional, description } = req.body;
        let instructions = new Array();
        let ingredients = new Array();
        if (Array.isArray(description))
        {
            for(let j=0; j<description.length;j++){
                instructions[j] = new Instruction(j+1, description[j]);
            }
        }
        else
        {
            instructions[0] = new Instruction(1, description);
        }
        if (Array.isArray(name))
        {
            for(let i=0; i<name.length;i++){
                ingredients[i] = new Ingredient(name[i],quantity[i],unit[i],optional[i]);
            }
        }
        else
        {
            ingredients[0] = new Ingredient(name,quantity,unit,optional);
        }
        let recipe = new Recipe(rtitle, req!.user!['Username'], ingredients, instructions, new Date(), esttime);
        DbClient.connect()
            .then((db: any)=>{
            db!.collection("Recipes").insertOne(recipe);
        })
            .then(() =>{
                req.flash('success', 'Recipe added!');
                res.status(201).redirect("/addrecipe");
        })
        .catch((err: any) => {
            req.flash('errors', "Oops! Something went wrong");
            return res.status(400).render('addrecipe',{ errors: req.flash('errors') });
        });
    };

    static async getAccountRecipes ( req: Request, res: Response) {
        DbClient.connect()
            .then((db: any) => {
                const retrieveRecipes = async callback => {
                    const myRecipes = await db!.collection("Recipes").find({username: req!.user!['Username']}).toArray();
                    const favorites = await db!.collection("Favorites").find({username: req!.user!['Username']}).toArray();
                    let favTitles: Array<string> = [];
                    for (let fav of favorites) favTitles.push(fav.RecipeTitle);
                    let myFavRecipes = await db!.collection("Recipes").find({title: {$in: favTitles} }).toArray();

                    let Recipes: {[id: string]: Array<string>} = {};
                    Recipes["myRecipes"] = myRecipes;
                    Recipes["Favorites"] = myFavRecipes;
                    callback(Recipes);
                };
                retrieveRecipes(Recipes => res.render("myaccount", {MyRecipes: Recipes["myRecipes"],
                    Favorites: Recipes["Favorites"], errors: req.flash('errors'), success: req.flash('success') }));
            })
            .catch((err: any) => {
                req.flash('errors', "Oops! Something went wrong");
                res.status(400).redirect("/");
            })
    }

    static getRecipe ( req: Request, res: Response) {
        DbClient.connect()
            .then((db: any) => {
                let o_id = new ObjectId(req.params.name);
                return db!.collection("Recipes").findOne({_id: o_id });
            })
            .then((Recipe: any) => {
                if (req!.user!['Username']== Recipe.username)
                    res.status(200).render("recipe", { Recipe: Recipe, errors: req.flash('errors'),  success:req.flash('success') } );
                else {
                    req.flash('errors', 'Not Authorized');
                    res.status(400).redirect("/");
                }
            })
            .catch((err: any) => {
                req.flash('errors', "Oops! Something went wrong");
                res.status(400).redirect("/");
            })
    }
    static likeRecipe ( req: Request, res: Response) {
        DbClient.connect()
            .then((db: any) => {
                let o_id = new ObjectId(req.body.id);
                return db!.collection("Recipes").findOneAndUpdate({_id: o_id }, {$inc: { "rating.Upvotes": 1}}, {returnOriginal: false});
            })
            .then((Recipe: any) => {
                res.status(200).send((Recipe.value.rating.Upvotes).toString());
            })
            .catch((err: any) => {
                req.flash('errors', "Oops! Something went wrong");
                res.status(400).redirect( "/");
            })
    }
    static dislikeRecipe( req: Request, res: Response) {
        DbClient.connect()
            .then((db: any) => {
                let o_id = new ObjectId(req.body.id);
                return db!.collection("Recipes").findOneAndUpdate({_id: o_id }, {$inc: { "rating.Downvotes": 1}},{returnOriginal: false});
            })
            .then((Recipe: any) => {
                res.status(200).send((Recipe.value.rating.Downvotes).toString());
            })
            .catch((err: any) => {
                req.flash('errors', "Oops! Something went wrong");
                res.redirect("/browse", 404);
            })
    }
    static geteditRecipe ( req: Request, res: Response) {
        DbClient.connect()
            .then((db: any) => {
                let o_id = new ObjectId(req.params.name);
                return db!.collection("Recipes").findOne({_id: o_id });
            })
            .then((Recipe: any) => {
                res.status(200).render("editrecipe", { Recipe: Recipe, errors: req.flash('errors'),  success:req.flash('success') } );
            })
            .catch((err: any) => {
                req.flash('errors', "Oops! Something went wrong");
                res.status(400).redirect("/");
            })
    }

    static deleteRecipe ( req: Request, res: Response) {
        let o_id = new ObjectId(req.params.name);
        DbClient.connect()
            .then((db: any) => {
                db!.collection("Recipes").deleteOne({_id: o_id });
                req.flash('success', 'Recipe deleted');
                res.status(200).redirect("/myaccount");
            })
            .catch((err: any) => {
                req.flash('errors', "Oops! Something went wrong");
                res.status(400).redirect("/");
            })
    }
    static editRecipe ( req: Request, res: Response) {
        let o_id = new ObjectId(req.params.name);
        let {rtitle, esttime, name, quantity, unit, optional, description } = req.body;
        let instructions = new Array();
        let ingredients = new Array();
        if (Array.isArray(description))
        {
            for(let j=0; j<description.length;j++){
                instructions[j] = new Instruction(j+1, description[j]);
            }
        }
        else
        {
            instructions[0] = new Instruction(1, description);
        }
        if (Array.isArray(name))
        {
            for(let i=0; i<name.length;i++){
                ingredients[i] = new Ingredient(name[i],quantity[i],unit[i],optional[i]);
            }
        }
        else
        {
            ingredients[0] = new Ingredient(name,quantity,unit,optional);
        }
        let recipe = new Recipe(rtitle, req!.user!['Username'], ingredients, instructions, new Date(), esttime);
        DbClient.connect()
            .then((db: any) => {
                db!.collection("Recipes").replaceOne({_id: o_id }, recipe);
                req.flash('success', 'Recipe edited');
                res.status(200).redirect("/myaccount");
            })
            .catch((err: any) => {
                req.flash('errors', "Oops! Something went wrong");
                res.status(400).redirect("/")
            })
    }

}
export default RecipeController;