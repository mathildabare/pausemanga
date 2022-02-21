/*
 * Delete: All Files
 * ****************************/

const fs = require('fs')
const path = require('path')

exports.deleteAllFiles = (dir, file) => {
    fs.unlink(path.join(dir, file), (err) => {
        if (err) console.log(err);
        else console.log('delte OK', file)
    });
}
