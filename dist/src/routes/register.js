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
var UserController_1 = __importDefault(require("../controllers/UserController"));
var RegisterRoute = /** @class */ (function (_super) {
    __extends(RegisterRoute, _super);
    function RegisterRoute() {
        return _super.call(this) || this;
    }
    RegisterRoute.create = function (router) {
        //add home page route
        router.get("/register", function (req, res, next) {
            new RegisterRoute().register(req, res, next);
        });
        router.post("/register", UserController_1.default.newUser);
    };
    RegisterRoute.prototype.register = function (req, res, next) {
        //set custom title
        this.title = "Register";
        //set message
        var options = {
            "message": "Register Page"
        };
        //render template
        this.render(req, res, "register", options);
    };
    return RegisterRoute;
}(route_1.BaseRoute));
exports.RegisterRoute = RegisterRoute;
//# sourceMappingURL=register.js.map