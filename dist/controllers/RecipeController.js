"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var ObjectId = require('mongodb').ObjectId;
/** RecipeController()
 *  Manages all request regarding recipes.
 *  Manages interactions of the Recipe Collections of the
 *  database and the application
 *
 */
var DbClient = require("../DbClient");
var RecipeController = /** @class */ (function () {
    function RecipeController() {
    }
    /** RetrieveRecipes()
     * Connects to database and renders the recipe data for the
     * /browse page
     *
     */
    RecipeController.retrieveRecipes = function (req, res) {
        DbClient.connect()
            .then(function (db) {
            return db.collection("Recipes").find().toArray();
        })
            .then(function (Recipes) {
            res.status(200).render("browse", { Recipes: Recipes, errors: req.flash('errors'), success: req.flash('success') });
        })
            .catch(function (err) {
            req.flash('errors', "Oops! Something went wrong");
            res.status(400).redirect("/login");
        });
    };
    RecipeController.queryRecipes = function (req, res) {
        DbClient.connect()
            .then(function (db) {
            return db.collection("Recipes").find({ $or: [{ title: { $regex: req.body.query, $options: 'i' } }, { "ingredients.name": { $regex: req.body.query, $options: 'i' } }] }).toArray();
        })
            .then(function (Recipes) {
            if (Recipes.length > 0) {
                if (req.body.sort == 'Highest Likes')
                    Recipes.sort(function (a, b) { return (a.rating.Upvotes < b.rating.Upvotes) ? 1 : -1; });
                else if (req.body.sort == 'Highest Dislikes')
                    Recipes.sort(function (a, b) { return (a.rating.Downvotes < b.rating.Downvotes) ? 1 : -1; });
                else if (req.body.sort == 'Recipe Title Z-A')
                    Recipes.sort(function (a, b) { return (a.title < b.title) ? 1 : -1; });
                else if (req.body.sort == 'Recipe Title A-Z')
                    Recipes.sort(function (a, b) { return (a.title > b.title) ? 1 : -1; });
                res.render("search", {
                    Recipes: Recipes,
                    query: req.body.query,
                    sort: req.body.sort,
                    errors: req.flash('errors'),
                    success: req.flash('success')
                });
            }
            else
                res.status(204).render("search", { query: req.body.query, errors: req.flash('errors'), success: req.flash('success') });
        })
            .catch(function (err) {
            req.flash('errors', "Oops! Something went wrong");
            res.status(400).redirect("/");
        });
    };
    RecipeController.getAccountRecipes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                DbClient.connect()
                    .then(function (db) {
                    var retrieveRecipes = function (callback) { return __awaiter(_this, void 0, void 0, function () {
                        var myRecipes, favorites, favTitles, _i, favorites_1, fav, myFavRecipes, Recipes;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, db.collection("Recipes").find({ username: req.user['Username'] }).toArray()];
                                case 1:
                                    myRecipes = _a.sent();
                                    return [4 /*yield*/, db.collection("Favorites").find({ username: req.user['Username'] }).toArray()];
                                case 2:
                                    favorites = _a.sent();
                                    favTitles = [];
                                    for (_i = 0, favorites_1 = favorites; _i < favorites_1.length; _i++) {
                                        fav = favorites_1[_i];
                                        favTitles.push(fav.RecipeTitle);
                                    }
                                    return [4 /*yield*/, db.collection("Recipes").find({ title: { $in: favTitles } }).toArray()];
                                case 3:
                                    myFavRecipes = _a.sent();
                                    Recipes = {};
                                    Recipes["myRecipes"] = myRecipes;
                                    Recipes["Favorites"] = myFavRecipes;
                                    callback(Recipes);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    retrieveRecipes(function (Recipes) { return res.render("myaccount", { MyRecipes: Recipes["myRecipes"],
                        Favorites: Recipes["Favorites"], errors: req.flash('errors'), success: req.flash('success') }); });
                })
                    .catch(function (err) {
                    req.flash('errors', "Oops! Something went wrong");
                    res.status(400).redirect("/");
                });
                return [2 /*return*/];
            });
        });
    };
    RecipeController.getRecipe = function (req, res) {
        DbClient.connect()
            .then(function (db) {
            var o_id = new ObjectId(req.params.name);
            return db.collection("Recipes").findOne({ _id: o_id });
        })
            .then(function (Recipe) {
            if (req.user['Username'] == Recipe.username)
                res.status(200).render("recipe", { Recipe: Recipe, errors: req.flash('errors'), success: req.flash('success') });
            else {
                req.flash('errors', 'Not Authorized');
                res.status(400).redirect("/");
            }
        })
            .catch(function (err) {
            req.flash('errors', "Oops! Something went wrong");
            res.status(400).redirect("/");
        });
    };
    RecipeController.likeRecipe = function (req, res) {
        DbClient.connect()
            .then(function (db) {
            var o_id = new ObjectId(req.body.id);
            return db.collection("Recipes").findOneAndUpdate({ _id: o_id }, { $inc: { "rating.Upvotes": 1 } }, { returnOriginal: false });
        })
            .then(function (Recipe) {
            res.status(200).send((Recipe.value.rating.Upvotes).toString());
        })
            .catch(function (err) {
            req.flash('errors', "Oops! Something went wrong");
            res.status(400).redirect("/");
        });
    };
    RecipeController.dislikeRecipe = function (req, res) {
        DbClient.connect()
            .then(function (db) {
            var o_id = new ObjectId(req.body.id);
            return db.collection("Recipes").findOneAndUpdate({ _id: o_id }, { $inc: { "rating.Downvotes": 1 } }, { returnOriginal: false });
        })
            .then(function (Recipe) {
            res.status(200).send((Recipe.value.rating.Downvotes).toString());
        })
            .catch(function (err) {
            req.flash('errors', "Oops! Something went wrong");
            res.redirect("/browse", 404);
        });
    };
    RecipeController.geteditRecipe = function (req, res) {
        DbClient.connect()
            .then(function (db) {
            var o_id = new ObjectId(req.params.name);
            return db.collection("Recipes").findOne({ _id: o_id });
        })
            .then(function (Recipe) {
            res.status(200).render("editrecipe", { Recipe: Recipe, errors: req.flash('errors'), success: req.flash('success') });
        })
            .catch(function (err) {
            req.flash('errors', "Oops! Something went wrong");
            res.status(400).redirect("/");
        });
    };
    RecipeController.deleteRecipe = function (req, res) {
        var o_id = new ObjectId(req.params.name);
        DbClient.connect()
            .then(function (db) {
            db.collection("Recipes").deleteOne({ _id: o_id });
            req.flash('success', 'Recipe deleted');
            res.status(200).redirect("/myaccount");
        })
            .catch(function (err) {
            req.flash('errors', "Oops! Something went wrong");
            res.status(400).redirect("/");
        });
    };
    RecipeController.editRecipe = function (req, res) {
        var o_id = new ObjectId(req.params.name);
        var _a = req.body, rtitle = _a.rtitle, esttime = _a.esttime, name = _a.name, quantity = _a.quantity, unit = _a.unit, optional = _a.optional, description = _a.description;
        var instructions = new Array();
        var ingredients = new Array();
        if (Array.isArray(description)) {
            for (var j = 0; j < description.length; j++) {
                instructions[j] = new types_1.Instruction(j + 1, description[j]);
            }
        }
        else {
            instructions[0] = new types_1.Instruction(1, description);
        }
        if (Array.isArray(name)) {
            for (var i = 0; i < name.length; i++) {
                ingredients[i] = new types_1.Ingredient(name[i], quantity[i], unit[i], optional[i]);
            }
        }
        else {
            ingredients[0] = new types_1.Ingredient(name, quantity, unit, optional);
        }
        var recipe = new types_1.Recipe(rtitle, req.user['Username'], ingredients, instructions, new Date(), esttime);
        DbClient.connect()
            .then(function (db) {
            db.collection("Recipes").replaceOne({ _id: o_id }, recipe);
            req.flash('success', 'Recipe edited');
            res.status(200).redirect("/myaccount");
        })
            .catch(function (err) {
            req.flash('errors', "Oops! Something went wrong");
            res.status(400).redirect("/");
        });
    };
    RecipeController.newRecipe = function (req, res) {
        var _a = req.body, rtitle = _a.rtitle, esttime = _a.esttime, name = _a.name, quantity = _a.quantity, unit = _a.unit, optional = _a.optional, description = _a.description;
        var instructions = new Array();
        var ingredients = new Array();
        if (Array.isArray(description)) {
            for (var j = 0; j < description.length; j++) {
                instructions[j] = new types_1.Instruction(j + 1, description[j]);
            }
        }
        else {
            instructions[0] = new types_1.Instruction(1, description);
        }
        if (Array.isArray(name)) {
            for (var i = 0; i < name.length; i++) {
                ingredients[i] = new types_1.Ingredient(name[i], quantity[i], unit[i], optional[i]);
            }
        }
        else {
            ingredients[0] = new types_1.Ingredient(name, quantity, unit, optional);
        }
        var recipe = new types_1.Recipe(rtitle, req.user['Username'], ingredients, instructions, new Date(), esttime);
        DbClient.connect()
            .then(function (db) {
            db.collection("Recipes").insertOne(recipe);
        })
            .then(function () {
            req.flash('success', 'Recipe added!');
            res.status(201).redirect("/addrecipe");
        })
            .catch(function (err) {
            req.flash('errors', "Oops! Something went wrong");
            return res.status(400).render('addrecipe', { errors: req.flash('errors') });
        });
    };
    return RecipeController;
}());
exports.default = RecipeController;
//# sourceMappingURL=RecipeController.js.map