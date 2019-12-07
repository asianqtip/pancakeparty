"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var DbClient = require("../DbClient");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.addtofav = function (req, res) {
        console.log(req.body);
        var fav = {};
        fav[req.body.name] = req.body;
        DbClient.connect()
            .then(function (db) {
            return db.collection("Users").findOne({ Username: req.user['Username'] });
        })
            .then(function (user) {
            user.favs.push({ fav: fav });
        })
            .catch(function (err) {
            req.flash('errors', "Oops! Something went wrong");
            res.status(400).redirect("/");
        });
    };
    UserController.newUser = function (req, res) {
        var _a = req.body, username = _a.username, password = _a.password, confirmPassword = _a.confirmPassword;
        if (UserController.findUser(username) != null) {
            req.flash('errors', "User already exists");
            return res.render('register', { errors: req.flash('errors') });
        }
        if (password != confirmPassword) {
            req.flash('errors', "Passwords do not match");
            return res.render('register', { errors: req.flash('errors') });
        }
        var user = new types_1.User(username, password);
        DbClient.connect()
            .then(function (db) {
            db.collection("Users").insertOne(user);
        }).then(function () {
            req.flash('success', 'User registered!');
            res.status(201).redirect("/");
        }).catch(function (err) {
            req.flash('errors', "Oops! Something went wrong.");
            res.status(400).redirect("/");
        });
    };
    UserController.findUser = function (username) {
        DbClient.connect()
            .then(function (db) {
            return db.collection("Users").findOne({ Username: username });
        })
            .then(function (user) {
            if (!user)
                return null;
            return user;
        })
            .catch(function (err) {
            return err;
        });
    };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=UserController.js.map