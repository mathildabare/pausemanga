/*
 * Multer: Articles
 * ****************************/


/**** IMPORT && CONFIG ****/

// Import Module
const multer = require('multer');

// Config stockage de Multer
const storage = multer.diskStorage({

    // Stockage fichiers image par défaut - Callback //
    destination: function (req, file, callback) {
        callback(null, './public/images/Articles')
    },

    // Format du nom de l'image à stocker //
    filename: function (req, file, callback) {
        const ext = Date.now() + '_' + file.originalname
        console.log('multer cb:', file)
        file.nomComplet = ext
        callback(null, ext)
    }
})


// Paramètres Config Multer //
const upload = multer({

    // stockage définit dans constante storage //
    storage: storage, 

    // Taille et Proportion des fichiers //
    limits: {
        fileSize: 1 * 4098 * 4098,
        files: 1
    },

    // Filtre en configurant des types d'images accepter //
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

// Exportation du module pour router.js //
module.exports = upload