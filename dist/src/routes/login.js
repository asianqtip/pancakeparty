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
var AuthController_1 = __importDefault(require("../controllers/AuthController"));
var LoginRoute = /** @class */ (function (_super) {
    __extends(LoginRoute, _super);
    function LoginRoute() {
        return _super.call(this) || this;
    }
    LoginRoute.create = function (router) {
        //add home page route
        router.get("/login", function (req, res, next) {
            new LoginRoute().login(req, res, next);
        });
        router.post("/login", AuthController_1.default.login);
    };
    LoginRoute.prototype.login = function (req, res, next) {
        //set custom title
        this.title = "Login";
        //render template
        this.render(req, res, "login");
    };
    return LoginRoute;
}(route_1.BaseRoute));
exports.LoginRoute = LoginRoute;
//# sourceMappingURL=login.js.map