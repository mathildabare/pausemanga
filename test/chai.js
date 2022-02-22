const assert = require('assert');
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = require("chai").should();
const expect = chai.expect;
const {app, query} = require("../server");
const path = require("path");
const rand = Math.floor((Math.random() * 100) + 54)
chai.use(chaiHttp);


/**
 ** TEST ROUTES - CHAI
 *********************************************/


describe("CHAI // CONTROLLER // ADMIN", () => {

    let customer = {};

    /****** Before Each  *******/

    beforeEach(async () => {
        
        const user = await query(`
        INSERT INTO users (username , mail, password, biography) 
        VALUES('BRUNO-${rand}', 'Bru-${rand}@no.fr', 'alive', '...')`);

        // console.log("Before EACH: ", user);
        // assert.ok(user.insertId);

        const userID = await query(`SELECT * FROM users where id = ${user.insertId}`);

        customer = userID[0];
        userID[0].username.should.be.a("string");
        userID[0].mail.should.be.a("string");
        userID[0].password.should.be.a("string");
        userID[0].biography.should.be.a("string");

    });

    /****** GET - ADMIN  *******/

    it(" ChaiRouter // Get Admin", (done) => {
        // test route Get
        chai
            .request(app)
            .get("/back/v1/admin")
            .set("Accept", "application/json")
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.dbarticles.should.be.a("array");
                res.body.dbarticles[0].should.be.a("object");
                done();
            });
    })


    it(" ChaiRouter // Post Article", (done) => {
        const body = {
            title: "Fire Force",
            genre_1: "horror",
            genre_2: "shonen",
            name: "Fire Force",
            img: "...",
            synopsis: "...",
        };

        chai
            .request(app)
            .post("/back/v1/admin/articles")
            .set("Accept", "application/json")
            .send(body)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.dbarticles.should.be.a("array");
                res.body.dbarticles[0].should.be.a("object");
                done();
            });
    });


    it("Exemple", (done) => {
        done();
    });

});