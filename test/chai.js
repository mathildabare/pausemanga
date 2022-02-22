const assert = require('assert');
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = require("chai").should();
const expect = chai.expect;
const { app, query } = require("../server");
const path = require("path");

chai.use(chaiHttp);


/**
 ** TEST ROUTES - CHAI
 *********************************************/


describe("AdminController - Chai", () => {

    let customer = {};

    // /****** Before Each  *******/

    beforeEach(async () => {

        const rand = Math.floor((Math.random() * 100) + 54)
        const date = new Date()
        const format = date.getMilliseconds() + rand

        const user = await query(`
        INSERT INTO users (username , mail, password, biography) 
        VALUES('BRUNO-${format}', 'Bru-${format}@no.fr', 'alive', '...')`);

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

    it("Get Admin", (done) => {
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


    /****** POST - ADMIN  *******/


    it("Post Article", (done) => {
        const date = new Date()
        const body = {
            title: "Fire Force 77 77 fuck off",
            name: "Fire Force" + date.getMilliseconds(),
            genre_1: "Shonen",
            genre_2: "Demons",
            synopsis: "...",
            img: "..." + date.getMilliseconds()
        };

        console.log("body", body);

        chai
            .request(app)
            .post("/back/v1/admin/articles")
            .set("Accept", "application/json")
            .send(body)
            .end((err, res) => {
                console.log('res;body tu', res.body)
                if (err) return done(err);
                res.should.have.status(200);
                // res.body.dbarticles.should.be.a("array");
                // res.body.dbarticles[0].should.be.a("object");
                done();
            });
    });




    /****** PUT  -  ADMIN   *******/



    /****** DELETE - ADMIN  *******/


    it("Exemple", (done) => {
        done();
    });

});