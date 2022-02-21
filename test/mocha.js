const assert = require("assert");
const { db } = require("../server");


    
/**
 ** TEST CRUD - MESSAGES
 *********************************************/

describe("MOCHA // CRUD // Customer", () => {
    let message = {};
    let id = 0;

    // Loop for create message before 'it'
    beforeEach(async () => {
        let values = ['BRUNO', 'Bru@nu.fr', 'alive', '...'];
        let sql = `INSERT INTO messages (name, mail, status, content) values('BRUNO', 'Bru@nu.fr', 'alive', '...')`;
        const user = await query(sql, [values]);

        // console.log("Before EACH: ", user);
        assert.ok(user.insertId);

        const messageID = await query(`SELECT * FROM messages where id = ${ user.insertId }`)
        message = messageID[0]
        assert.strictEqual(messageID[0].name, "BRUNO");
        assert.strictEqual(messageID[0].mail, "Bru@nu.fr");
        assert.strictEqual(messageID[0].status, "alive");
        assert.strictEqual(messageID[0].content, "...");

    });


    /****** POST  *******/
    it("POST // Messages", async () => {
        let values = ['Node', 'no@de.fr', 'dead', '...'];
        let sql = `INSERT INTO messages (name, mail, status, content) values('Node', 'no@de.fr', 'dead', '...')`;
        const user = await query(sql, [values]);

        // console.log("POST: ", user.insertId)

        assert.ok(user);

        const messageID = await query(`SELECT * FROM messages where id = ${user.insertId}`);
        assert.strictEqual(messageID[0].name, "Node");
        assert.strictEqual(messageID[0].mail, "no@de.fr");
        assert.strictEqual(messageID[0].status, "dead");
        assert.strictEqual(messageID[0].content, "...");

    });


    /******  GET  *******/
    // Get All
    it("GET ALL // Messages", async () => {
        let sql = `SELECT * FROM messages`;
        const listMessages = await db.query(sql);

        // console.log('GET ALL: ', listMessages)

        assert.ok(listMessages);

        const messages = await db.query(`SELECT * FROM messages`);
        assert.strictEqual(messages.length > 0, true);
    });

    // Get ID Customer
    it("GET ID // Message", async () => {
        // Récupère l'id du BeforeEach
        let sql = `SELECT * FROM messages WHERE id = ${message.id}`;
        const messageID = await query(sql);

        // console.log('GETID: ', userID)
        assert.ok(messageID);
    });


    /******  PUT  *******/
    it("PUT ID // Messages", async () => {
        // console.log("EDITT: ", customer);
        let sql = `UPDATE messages
                     SET name = 'Tobi',
                         mail = 'akatsuki@kohai.mask',
                         status = 'undead',
                         content = 'senpai'
                     WHERE id = '${message.id}' ;`;

        const user = await query(sql);
        const messageID = await query(`SELECT * FROM messages WHERE id = ${message.id}`);

        // console.log('PUT: ', userID)

        assert.ok(messageID);

        assert.strictEqual(messageID[0].name, "Tobi");
        assert.strictEqual(messageID[0].mail, "akatsuki@kohai.mask");
        assert.strictEqual(messageID[0].status, "undead");
        assert.strictEqual(messageID[0].content, "senpai");
    });


    /***** DELETE  ******/
    // Delete ID
    it("DELETE ID // Messages", async () => {
        let sql = `DELETE FROM messages WHERE id = ${message.id}`;
        await query(sql);

        // console.log("DELETE ID: ", userID);

        const messageID = await query(`SELECT * FROM messages where id = ${message.id}`);
        assert.ok(messageID);
        assert.strictEqual(messageID.length, 0);
    });

    // Delete ALL
    it("DELETE ALL // Messages", async () => {
        let sql = `DELETE FROM messages`;
        const user = await query(sql);

        // console.log('DELETE ALL: ', listUser.length)

        const listMessages = await query("SELECT * FROM messages");
        assert.strictEqual(listMessages.length, 0);
    });


    // Test
    it("TEST // message", (done) => {
        // console.log("TEST: ", id)
        done();
    });


})


