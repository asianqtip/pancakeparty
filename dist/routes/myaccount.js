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
var MyAccountRoute = /** @class */ (function (_super) {
    __extends(MyAccountRoute, _super);
    function MyAccountRoute() {
        return _super.call(this) || this;
    }
    MyAccountRoute.create = function (router) {
        router.get("/myaccount", function (req, res) {
            if (req.isAuthenticated()) {
                RecipeController_1.default.getAccountRecipes(req, res);
            }
            else {
                req.flash('errors', 'Not Authorized');
                res.redirect('/login');
            }
        });
    };
    return MyAccountRoute;
}(route_1.BaseRoute));
exports.MyAccountRoute = MyAccountRoute;
//# sourceMappingURL=myaccount.js.map