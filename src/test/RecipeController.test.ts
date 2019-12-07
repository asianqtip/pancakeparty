//import {expect} from 'chai';

import RecipeController from "../controllers/RecipeController";
import {mockRequest, mockResponse} from "mock-req-res";
import { Server} from "../app";
import {Request, Response} from "express";
//var flash = require("connect-flash");
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
        let username = "testuser";
        let password = "testpassword";
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
    describe('accessing protected route', async function () {
        this.timeout(6000);
        loginUser();
        await it('should be able to create recipe', function (done) {
        server
            .post('/addrecipe')
            .send({ rtitle: "Pancake Auto test", esttime: 5, name:"Sugar", quantity: 2, unit: "tablespoon", optional: false, description:"Mix well. Microwave" })
            .expect(302)
            .end(function (err, res) {
                if (err) return done(err);
                console.log(res.body);
                done()
            });

        });
        await it('should be able to see new recipe', function (done) {
            this.timeout(18000);
            server
                .get('/browse')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    console.log(res.body);
                    done()
                });
        });
    });
    after(async function () {
        await DbClient.connect().then((db: any) => {
            db!.collection("Recipes").deleteMany({ title: { $regex: /test/ } })
            .then(() =>{
                db!.collection("Users").deleteOne({Username: "testuser"});
            });
            console.log("after");
        })
    });
});
function loginUser() {
    return function(done) {
        server
            .post('/login')
            .send({ username: 'testuser', password: 'testpassword' })
            .expect(302)
            .end(onResponse);
        function onResponse(err, res) {
            if (err) return done(err);
            return done();
        }
    };
}
