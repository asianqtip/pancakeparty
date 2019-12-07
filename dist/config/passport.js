"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = __importDefault(require("passport-local"));
//import { Request, Response, NextFunction } from "express";
var DbClient = require("../DbClient");
var LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser(function (user, done) {
    console.log("serialize");
    done(undefined, user);
});
passport_1.default.deserializeUser(function (user, done) {
    console.log("deserialize");
    var ObjectId = require('mongodb').ObjectId;
    done(null, user);
});
passport_1.default.use(new LocalStrategy(function (username, password, done) {
    DbClient.connect()
        .then(function (db) {
        return db.collection("Users").findOne({ Username: username });
    })
        .then(function (user) {
        if (!user) {
            return done(undefined, false, { message: "Username " + username + " not found." });
        }
        return done(undefined, user);
    })
        .catch(function (err) {
        console.log(err);
        return done(undefined, false, { message: "Invalid email or password." });
    });
}));
//# sourceMappingURL=passport.js.map