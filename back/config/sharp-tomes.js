
/*
 * Sharp: Tomes
 * ****************************/


/**** IMPORT && CONFIG ****/

// Import Module
const sharp = require('sharp')
const path = require("path")
const fs = require('fs');

module.exports = (req, res, next) => {

    if (req.file) {
        let pathSharp = "./public/images/Tomes/"
        const file = req.file;

        sharp(file.path)
            .webp({ quality: 100 })
            .toFile(pathSharp + file.filename.split('.').slice(0, -1).join('.') + ".webp", (err, info) => { })
            .toBuffer()
            .then(() => {

                pathImg = path.resolve("public/images/Tomes/" + req.file.filename)

                fs.unlink(pathImg, (err) => {
                    if (err) console.log(err)
                })
            })
            .catch(err => console.log(err));
    next();
    } else next()
}

