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
var LogoutRoute = /** @class */ (function (_super) {
    __extends(LogoutRoute, _super);
    function LogoutRoute() {
        return _super.call(this) || this;
    }
    LogoutRoute.create = function (router) {
        router.get("/logout", AuthController_1.default.logout);
    };
    return LogoutRoute;
}(route_1.BaseRoute));
exports.LogoutRoute = LogoutRoute;
//# sourceMappingURL=logout.js.map