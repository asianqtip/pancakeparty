import RecipeController from "../controllers/RecipeController";
import {mockRequest, mockResponse} from "mock-req-res";
import { Server} from "../app";
import {Request, Response} from "express";
var chai = require("chai"), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = require('supertest');
import { expect } from "chai";
import UserController from "../controllers/UserController";
import {User} from "../types";
const DbClient = require("../DbClient");

var app = new Server().app;
var server = request.agent(app);

describe('RecipeController test:', function() {
    before(async function () {
        let username = "admin";
        let password = "anything";
        let user = new User( username, password);
        await DbClient.connect().then((db: any) => {
            db!.collection("Users").insertOne(user);
        })
    });
    describe('accessing protected route', async function () {
        it('should allow the user to login', loginUser());
        await it('should be able to access authenticated page', function (done) {
            this.timeout(6000);
            server
                .get('/myaccount')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    console.log(res.body);
                    done()
                });
        })
    });
    describe('accessing browse route', async function () {
        this.timeout(18000);
        await it('should be able to delete non-pancake recipes', function () {
            DbClient.connect().then((db: any) => {
                db!.collection("Recipes").deleteMany({title: {$not: {$regex:' pancake', $options: 'i'}}});
            })
        });
        await it('should be able to see no non-pancake recipes', function () {
            this.timeout(30000);

            DbClient.connect().then((db: any) => {
            return db!.collection("Recipes").find({ title: { $not: { $regex: /pancake/i } } }).toArray();
            }).then((Recipes: any) => {
                expect(Recipes.length).equals(0);
            })
        });
    });
    after(async function () {
        await DbClient.connect().then((db: any) => {
            db!.collection("Users").deleteOne({ Username: "admin"});
            console.log("after");
        })
    });
});
function loginUser() {
    return function(done) {
        server
            .post('/login')
            .send({ username: 'admin', password: 'anything' })
            .expect(302)
            .end(onResponse);
        function onResponse(err, res) {
            if (err) return done(err);
            return done();
        }
    };
}
