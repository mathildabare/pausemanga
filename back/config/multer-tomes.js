/*
 * Multer: Users
 * ****************************/


/**** IMPORT && CONFIG ****/

const multer = require('multer');
const storage = multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, './public/images/Tomes')
    },
    filename: function (req, file, callback) {
        const ext = Date.now() + '_' + file.originalname
        console.log('multer cb:', file)
        file.nomComplet = ext
        callback(null, ext)
    }
})
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1 * 4098 * 4098,
        files: 1
    },
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"|| 
            file.mimetype === "image/gif" 
        ) {
            callback(null, true)
        } else {
            callback(null, false)
            callback(new Error('Votre fichier doit être au format .png, .jpg, .jpeg ou .gif .'))
        }
    }
})



/**** EXPORT ****/

module.exports = upload