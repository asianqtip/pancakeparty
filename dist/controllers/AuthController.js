"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
require("../config/passport");
/** AuthController()
 * Handles user login and authentication.
 * Currently, login is authenticated by searching the db for a matching username.
 * To be implemented: SHA1 password hashing and verification.
 *
**/
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    /** login()
     * Connects to database to find data matching the username.
     * Successful login results in a redirection to the homepage.
     * Otherwise, will be redirected to the login page. (input form blank)
     **/
    AuthController.login = function (req, res, next) {
        passport_1.default.authenticate("local", { session: true }, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.flash("errors", info.message);
                return res.status(400).redirect("/login");
            }
            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                req.flash("success", "You have successfully logged in.");
                res.status(200).redirect(req.session.returnTo || "/");
            });
        })(req, res, next);
    };
    AuthController.logout = function (req, res) {
        req.logout();
        req.flash("success", "You have successfully logged out.");
        res.status(200).redirect(req.session.returnTo || "/");
    };
    return AuthController;
}());
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map