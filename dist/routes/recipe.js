"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var route_1 = require("./route");
var RecipeController_1 = __importDefault(require("../controllers/RecipeController"));
var ObjectId = require('mongodb').ObjectId;
var RecipeRoute = /** @class */ (function (_super) {
    __extends(RecipeRoute, _super);
    function RecipeRoute() {
        return _super.call(this) || this;
    }
    RecipeRoute.create = function (router) {
        router.get('/recipe', function (req, res) {
            if (req.isAuthenticated()) {
                res.render("recipe", { errors: req.flash('errors'), success: req.flash('success') });
            }
            else {
                req.flash("errors", 'You are not authorized to access that page. Please login');
                res.redirect('/login');
            }
        });
        router.get('/recipe/:name', function (req, res) {
            if (req.isAuthenticated()) {
                RecipeController_1.default.getRecipe(req, res);
            }
            else {
                res.redirect('/login');
            }
        });
        router.post('/recipe/:name/delete', function (req, res) {
            if (req.isAuthenticated()) {
                RecipeController_1.default.deleteRecipe(req, res);
            }
            else {
                res.redirect('/login');
            }
        });
        router.get('/recipe/:name/edit', function (req, res) {
            if (req.isAuthenticated()) {
                RecipeController_1.default.geteditRecipe(req, res);
            }
            else {
                res.redirect('/login');
            }
        });
        router.post('/recipe/:name/edit', function (req, res) {
            if (req.isAuthenticated()) {
                RecipeController_1.default.editRecipe(req, res);
            }
            else {
                res.redirect('/login');
            }
        });
    };
    return RecipeRoute;
}(route_1.BaseRoute));
exports.RecipeRoute = RecipeRoute;
//# sourceMappingURL=recipe.js.map