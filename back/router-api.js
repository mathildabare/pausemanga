/*
 * IMPORTS
 * ************************** */

const express = require("express");
const router = express.Router();
const testController = require('./controllers-api/testController')



/*** ROUTES ***/

router.route('/admin')
    .get(testController.get)

router.route('/admin/articles')
    .post(testController.post)

router.route('/admin/articles/:id')
    .put(testController.put)
    .delete(testController.delete)


    
module.exports = router;