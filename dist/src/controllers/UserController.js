"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.newUser = function (req, res) {
        var _a = req.body, username = _a.username, password = _a.password, confirmPassword = _a.confirmPassword;
        console.log("passsword2 is " + confirmPassword);
        console.log("password is " + password);
        if (password != confirmPassword) {
            req.flash('error1', "Passwords do not match");
            return res.render('register', { messages: req.flash('error1') });
        }
        var user = new types_1.User(1, username, password);
        console.log("username is " + username);
        console.log("password is " + password);
        console.log("user ID is " + user.UserID);
        res.redirect("/");
    };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=UserController.js.map