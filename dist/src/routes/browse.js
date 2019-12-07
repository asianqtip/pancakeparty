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
Object.defineProperty(exports, "__esModule", { value: true });
var route_1 = require("./route");
var BrowseRoute = /** @class */ (function (_super) {
    __extends(BrowseRoute, _super);
    function BrowseRoute() {
        return _super.call(this) || this;
    }
    BrowseRoute.create = function (router) {
        //add home page route
        router.get("/browse", function (req, res, next) {
            new BrowseRoute().browse(req, res, next);
        });
    };
    BrowseRoute.prototype.browse = function (req, res, next) {
        //set custom title
        this.title = "Browse Recipes";
        //Extracts test data from public folder to fill display
        var a = require("../../public/data/test1.json");
        var b = require("../../public/data/test2.json");
        //set message
        var options = {
            "message": "Browse Page",
            "recipes": [a, b],
        };
        //render template
        this.render(req, res, "browse", options);
    };
    return BrowseRoute;
}(route_1.BaseRoute));
exports.BrowseRoute = BrowseRoute;
//# sourceMappingURL=browse.js.map