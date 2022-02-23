console.log("Mon app node js");

require("dotenv").config();



/*
 * IMPORT
 * ****************************/

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const port = process.env.PORT || 3004;
const { engine } = require("express-handlebars");
const mysql = require('mysql');
const util = require("util");
const session = require('express-session');



/*
 * CONFIGS
 * ****************************/



/*  ****** DB *****  */
const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:  process.env.DB_PORT,
}

db = mysql.createConnection(options)

db.config.queryFormat = function (query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};


db.query = util.promisify(db.query).bind(db);
db.connect((err) => {
  if (err) console.error("error connecting: " + err.stack);
  console.log("connected as id " + db.threadId);
});

global.query = db.query;
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(options);



/*  ****** Session *****  */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    resave: process.env.SESSION_RESAVE,
    saveUninitialized: process.env.SESSION_SAVEUNINITIALIZED,
    store: sessionStore
  }));



/*  ****** Handlebars *****  */
app.set("view engine", "hbs");
app.engine("hbs", engine({
  extname: "hbs",
  defaultLayout: "main",
}));



/*  ****** Method_Override *****  */
app.use(methodOverride('_method'))



/*  ****** Body-Parser *****  */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));



/*  ****** Route Dossier Static *****  */
app.use("/assets", express.static('public'));



/*  ****** User / Admin *****  */
app.use('*', (req, res, next) => {
  
  if (req.session.user) res.locals.user = req.session.user
                        res.locals.isAdmin = req.session.isAdmin
  // console.log('isAdmin', req.session.user.isAdmin);
  next()
})



/*  ************ SWAGGER ***********  */
// Import SWAGGER-UI || express-aos-generator
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./back/config/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// const expressOasGenerator = require('express-oas-generator');
// expressOasGenerator.init(app, {});



/*  ***** ROUTERS && PAGE 404 *****  */

// Import Router
const ROUTER = require('./back/router')
app.use('/', ROUTER)

const ROUTER_API = require('./back/router-api')
app.use('/back/v1', ROUTER_API)


// Page 404
// app.use('*', function (req, res) {
  //   res.status(404).render("error404", {
    //       layout: 'err404'
    //   })
    // })
    
   
    
/*  ************ PORT ***********  */

// Lancement de l'application sur le port .env
app.listen(port, () => {
  console.log("le serveur tourne sur le prt: " + port);
});


module.exports = { app, db, query }