
import { Server} from "../app";
var chai = require("chai"), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = require('supertest');
import UserController from "../controllers/UserController";
import {User} from "../types";
const DbClient = require("../DbClient");

var app = new Server().app;
var server = request.agent(app);

describe('Route test:', function() {
    describe('public routes', function () {

        it('Should be able to reach homepage', function (done) {
            server
                .get('/')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done()
                })
        });
        it('Should be able to reach browse page', function (done) {
            server
                .get('/browse')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done()
                })
        });
        it('Should be able to reach login page', function (done) {
            server
                .get('/login')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done()
                })
        });
        it('Should be able to reach register page', function (done) {
            server
                .get('/register')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done()
                })
        });
        it('Should be able to reach search page', function (done) {
            server
                .get('/search')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done()
                })
        });
    })
    describe('Should be redirected when accessing protected routes', function (){
        it('Should be redirected when accessing addrecipe page',function (done){
            server
                .get('/addrecipe')
                .expect(302)
                .end(function (err, res) {
                    if (err) return done(err);
                    done()
                })

        });
        it('Should be redirected when accessing myaccount page',function (done){
            server
                .get('/myaccount')
                .expect(302)
                .end(function (err, res) {
                    if (err) return done(err);
                    done()
                })

        });
        it("Should be redirected when accessing user's recipe page",function (done){
            server
                .get('/recipe')
                .expect(302)
                .end(function (err, res) {
                    if (err) return done(err);
                    done()
                })

        });

    });

});

