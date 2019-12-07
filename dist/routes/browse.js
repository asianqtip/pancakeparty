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
var BrowseRoute = /** @class */ (function (_super) {
    __extends(BrowseRoute, _super);
    function BrowseRoute() {
        return _super.call(this) || this;
    }
    BrowseRoute.create = function (router) {
        router.get("/browse", RecipeController_1.default.retrieveRecipes);
    };
    return BrowseRoute;
}(route_1.BaseRoute));
exports.BrowseRoute = BrowseRoute;
//# sourceMappingURL=browse.js.map