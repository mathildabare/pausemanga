/*
 * IMPORTS
 * ************************** */


const express = require("express");
const router = express.Router();

// Import des controllers
const HomeController = require("./controllers/HomeController");
const ContactController = require("./controllers/ContactController");
const BlogController = require("./controllers/BlogController");
const AuthController = require('./controllers/AuthController');
const MailController = require('./controllers/MailController')
const AdminController = require('./controllers/AdminController')

// Multer
const uploadArticles = require("./config/multer-articles");
const uploadUsers = require("./config/multer-users");
const uploadTomes = require("./config/multer-tomes");

// Sharp
const sharpUsers = require('./config/sharp-users');
const sharpArticles = require('./config/sharp-articles');
const sharpTomes = require('./config/sharp-tomes');

// Middlewares
const mdl = require('./middlewares/isAdmin')


/*
 * ROUTES
 * ************************** */



/*  ********* HOME **********  */

router.route("/")
  .get(HomeController.homepage)
  .post(HomeController.createMessage)



/*  ********* BLOG **********  */

// BLOG
router.route("/article")
  .get(BlogController.articlepage)
  .post(uploadArticles.single('img'), sharpArticles, BlogController.createArticleUser)

router.route("/article/:id") //
  .get(BlogController.pageArticleID)
  .post(BlogController.createComment)



/*  ******** CONTACT *********  */

// CONTACT
router.route("/contact")
  .get(ContactController.contactpage)
  .post(ContactController.createMessage);



/*  ***** AUTHENTICATION *****  */

// AUTHENTICATION
router.route('/login')
  .post(AuthController.loginData)

router.route('/register')
  .get(AuthController.registerpage)
  .post(uploadUsers.single('avatar'), sharpUsers, AuthController.createUser)

router.route('/user')
  .get(AuthController.userProfile)

router.route('/user/:id')
  .put(uploadUsers.single('avatar'), sharpUsers, AuthController.editUser)

router.route('/logout')
  .get(AuthController.logout)



/*  ******** NODEMAILER *********  */

router.route('/lostpassword')
  .get(MailController.lostpasswordPage)
  .post(MailController.lostpassword)

router.route('/resetpassword/:id')
  .get(MailController.resetpasswordPage)
  .post(MailController.resetpassword)


/*  ******** ADMIN *********  */

// ADMIN
router.route('/admin')
  .get(mdl.isAdmin, AdminController.get)

router.route('/admin/:id')
  .put(mdl.isAdmin, uploadUsers.single('avatar'),sharpUsers, AuthController.editUser)

router.route('/admin/ban/users/:id')
  .put(mdl.isAdmin, AdminController.banUserID)

router.route('/admin/users/:id')
  .put(mdl.isAdmin, AdminController.editUserID)

router.route('/admin/articles')
  .post(mdl.isAdmin, uploadArticles.single('img'),sharpArticles, AdminController.createArticleAdmin)

router.route('/admin/articles/:id')
  .put(mdl.isAdmin, uploadArticles.single('img'),sharpArticles, AdminController.editArticleID)
  .delete(AdminController.deleteArticleID)

router.route('/admin/tomes')
  .post(mdl.isAdmin, uploadTomes.single('img'), sharpTomes, AdminController.createTome)

router.route("/admin/tomes/:id")
  .put(mdl.isAdmin, uploadTomes.single('img'), sharpTomes, AdminController.editTomeID)
  .delete(AdminController.deleteTomeID)

router.route('/admin/comments/:id')
  .delete(mdl.isAdmin, AdminController.deleteCommentID)

router.route('/admin/messages/:id')
  .delete(mdl.isAdmin, AdminController.deleteMessageID)



/*** EXPORT DU ROUTER *** */

module.exports = router;