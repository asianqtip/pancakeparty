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
require("../config/passport");
var AddRecipeRoute = /** @class */ (function (_super) {
    __extends(AddRecipeRoute, _super);
    function AddRecipeRoute() {
        return _super.call(this) || this;
    }
    AddRecipeRoute.create = function (router) {
        router.get("/addrecipe", function (req, res) {
            if (req.isAuthenticated()) {
                res.render('addrecipe', { errors: req.flash('error'), success: req.flash('success') });
            }
            else {
                res.redirect('/login');
            }
        });
        router.post("/addrecipe", RecipeController_1.default.newRecipe);
    };
    return AddRecipeRoute;
}(route_1.BaseRoute));
exports.AddRecipeRoute = AddRecipeRoute;
//# sourceMappingURL=addrecipe.js.map