/*
 * EDIT - Update File 
 * ****************************/

const fs = require('fs')
const path = require('path')

exports.updateFile = (dir, file) => {

    fs.unlink(path.join(dir, file), (err) => {
        if (err) console.log(err);
        else console.log('delte OK', file)
    });
}

//Unlink

//

//Readdir





// D'abord, DELETE ancien fichier, ensuite, ADD le nouveau


// const article = await db.query(`select * from articles WHERE  id = ${ req.params.id };`)
// await db.query(`delete from articles where id = ${ req.params.id }`)

// const dir = path.join('./public/images/Articles')
// deleteOneFile(dir, article[0].img)