/*
 * IMPORTS
 * ************************** */


const express = require("express");
const router = express.Router();

// Import des controllers
const HomeController = require("./controllers-api/HomeController");
const ContactController = require("./controllers-api/ContactController");
const BlogController = require("./controllers-api/BlogController");
const AuthController = require('./controllers-api/AuthController');
const MailController = require('./controllers-api/MailController')
const AdminController = require('./controllers-api/AdminController')

// Multer
const uploadArticles = require("./config/multer-articles");
const uploadUsers = require("./config/multer-users");
const uploadTomes = require("./config/multer-tomes");



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
    .post(uploadArticles.single('img'), BlogController.createArticleUser)

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
    .post(uploadUsers.single('avatar'), AuthController.createUser)

router.route('/user')
    .get(AuthController.userProfile)

router.route('/user/:id')
    .put(uploadUsers.single('avatar'), AuthController.editUser)

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
    .get(AdminController.get)

router.route('/admin/:id')
    .put(uploadUsers.single('avatar'), AuthController.editUser)

router.route('/admin/ban/users/:id')
    .put(AdminController.banUserID)

router.route('/admin/users/:id')
    .put(AdminController.editUserID)

router.route('/admin/articles')
    .post(AdminController.createArticleAdmin)
    // uploadArticles.single('img'), 

router.route('/admin/articles/:id')
    .put(AdminController.editArticleID)
    .delete(AdminController.deleteArticleID)
    // uploadArticles.single('img'),
router.route("/admin/tomes/:id")
    .post(uploadTomes.single('img'), AdminController.createTome)
    .put(uploadTomes.single('img'), AdminController.editTomeID)
    .delete(AdminController.deleteTomeID)

router.route('/admin/comments/:id')
    .delete(AdminController.deleteCommentID)

router.route('/admin/messages/:id')
    .delete(AdminController.deleteMessageID)



/*** EXPORT DU ROUTER *** */

module.exports = router;