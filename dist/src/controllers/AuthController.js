"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        var DbClient = require("../DbClient");
        var _a = req.body, username = _a.username, password = _a.password;
        DbClient.connect()
            .then(function (db) {
            return db.collection("Users").find().toArray();
        })
            .then(function (Users) {
            var user = Users.find(function (user) { return user.UserName === username; });
            if (user == null) {
                req.flash('error', 'User does not exist');
                return res.render('login', { messages: req.flash('error') });
            }
            console.log(user);
            req.flash('success', 'Successful Login!');
            return res.redirect("/");
        })
            .catch(function (err) {
            console.log("No user found");
            return res.redirect("/login");
        });
    };
    return AuthController;
}());
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map