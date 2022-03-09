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

    // let customer = {};
    let articles = {};



    // /****** Before Each  *******/

    beforeEach(async () => {

        const rand = Math.floor((Math.random() * 100) + 54)
        const date = new Date()
        const format = date.getMilliseconds() + rand

        const article = await query(`
        INSERT INTO articles (title, name, genre_1, genre_2, synopsis, img) 
        VALUES('BNHA${format}', 'BNHA${format}', 'Shonen', 'Super-Heroes', '...', '...${format}')
        `);

        // console.log("Before EACH: ", articles);
        // assert.ok(articles.insertId);

        const articleID = await query(`SELECT * FROM articles where id = ${article.insertId}`);

        articles = articleID[0];
        articleID[0].title.should.be.a("string");
        articleID[0].name.should.be.a("string");
        articleID[0].genre_1.should.be.a("string");
        articleID[0].genre_2.should.be.a("string");
        articleID[0].synopsis.should.be.a("string");
        articleID[0].img.should.be.a("string");
        

        // console.log(articles.id);
    });



    /****** GET PAGE - ADMIN  *******/

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



    /****** GET ID - BLOG  *******/

    // it("Get Article ID", (done) => {
    //     // test route Get
    //     chai
    //       .request(app)
    //       .get(`/back/v1/article/${articles.id}`)
    //       .set("Accept", "application/json")
    //       .end((err, res) => {
    //         if (err) return done(err);
    //         // console.log('mes articles', res.body.dbarticles)
    //         res.should.have.status(200);
    //         res.body.dbarticles.should.be.a("array");
    //         res.body.dbarticles[0].should.be.a("object");
    //         done();
    //       });
    //   });
    

    /****** POST - ADMIN  *******/


    it("Post Article", (done) => {
        const date = new Date()
        const body = {
            title: "Kuroshitsuji",
            name: "Kuroshitsuji" + date.getMilliseconds(),
            genre_1: "Shonen",
            genre_2: "Demons",
            synopsis: "...",
            img: "..." + date.getMilliseconds()
        };

        // console.log("body", body);

        chai
            .request(app)
            .post("/back/v1/admin/articles")
            .set("Accept", "application/json")
            .send(body)
            .end((err, res) => {
                // console.log('res.body tu', res.body.dbarticles)
                if (err) return done(err);
                res.should.have.status(200);
                res.body.dbarticles.should.be.a("array");
                res.body.dbarticles[0].should.be.a("object");
                done();
            });
    });


    /****** PUT  -  ADMIN   *******/


    it("Put Article", (done) => {
        const date = new Date()
        const body = {
            title: "Fire Force",
            name: "Fire Force" + date.getMilliseconds(),
            genre_1: "Shonen",
            genre_2: "Demons",
            synopsis: "...",
            img: "..." + date.getMilliseconds()
        };

        // Test route Put
        chai
            .request(app)
            .put(`/back/v1/admin/articles/${articles.id}`)
            .set("Accept", "application/json")
            .send(body)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                // console.log(res.body.dbarticles);
                res.body.dbarticles.should.be.a("array");
                res.body.dbarticles[0].should.be.a("object");
                done();
            });
    });


    /****** DELETE ID - ADMIN  *******/

    it("Delete Article ID", (done) => {
        // Test route Delete
        chai
            .request(app)
            .delete(`/back/v1/admin/articles/${articles.id}`)
            .set("Accept", "application/json")
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