import { Request, Response } from "express";
import { User } from "../types";
const DbClient = require("../DbClient");

class UserController {
    static newUser = (req: Request, res: Response) => {
        let {username, password, confirmPassword} = req.body;

        if (UserController.findUser(username) != null) {
            req.flash('errors', "User already exists");
            return res.render('register', {errors: req.flash('errors')});
        }
        if (password != confirmPassword) {
            req.flash('errors', "Passwords do not match");
            return res.render('register', {errors: req.flash('errors')});
        }
        let user = new User(username, password);
        DbClient.connect()
            .then((db: any) => {
                db!.collection("Users").insertOne(user)
            }).then(() =>{
            req.flash('success', 'User registered!');
            res.status(201).redirect("/");
        }).catch((err: any) => {
            req.flash('errors', "Oops! Something went wrong.");
            res.status(400).redirect("/")
        })
    };
    static addtofav( req: Request, res: Response) {
        console.log(req.body);
        let fav = {};
        fav[req.body.name] = req.body;
        DbClient.connect()
            .then((db: any) => {
                return db!.collection("Users").findOne({Username: req.user!['Username']});
            })
            .then((user: any) => {
                user.favs.push({fav});
            })
            .catch((err: any) => {
                req.flash('errors', "Oops! Something went wrong");
                res.status(400).redirect("/")
            })
    }
    static findUser = (username) => {
        DbClient.connect()
            .then((db: any) => {
                return db!.collection("Users").findOne({Username: username});
            })
            .then((user: any) => {
                if (!user)
                    return null;
                return user;
            })
            .catch((err: any) => {
                return err;
            })

    };
}
export default UserController;