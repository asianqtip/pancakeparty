import passport from "passport";
import passportLocal from "passport-local";
//import { Request, Response, NextFunction } from "express";

const DbClient = require("../DbClient");
const LocalStrategy = passportLocal.Strategy;
const ObjectId = require('mongodb').ObjectId;

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user);
});

passport.deserializeUser((user,  done) => {
    done(null, user);
});

passport.use(new LocalStrategy(
    (username, password, done) => {
    DbClient.connect()
        .then((db: any) => {
            return db!.collection("Users").findOne({Username: username});
        })
        .then((user: any) => {
            if (!user) {
                return done(undefined, false, {message: `Username ${username} not found.`});
            }
                return done(undefined, user);
            })
            .catch((err: any) => {
                return done(undefined, false, { message: "Invalid email or password." });
            })

    }));