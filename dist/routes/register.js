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
        //add register route
        router.get("/register", function (req, res) {
            new RegisterRoute().register(req, res);
        });
        router.post("/register", UserController_1.default.newUser);
    };
    RegisterRoute.prototype.register = function (req, res) {
        this.render(req, res, "register", { errors: req.flash('errors'), success: req.flash('success') });
    };
    return RegisterRoute;
}(route_1.BaseRoute));
exports.RegisterRoute = RegisterRoute;
//# sourceMappingURL=register.js.map