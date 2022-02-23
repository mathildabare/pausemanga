/*
 * Controller: ADMIN
 * **************** */

// FS Files
const fs = require("fs");
const path = require('path')
const directory = path.resolve("./public/images/Articles")

// Utils Files
const { deleteOneFile } = require('../utils/deleteOneFile')
const { updateFile } = require('../utils/updateFile')


// Page Admin
exports.get = async (req, res) => {

  const users = await db.query(`select * from users`);
  const articles = await db.query(`select * from articles order by title`);
  const tomes = await db.query(`select * from tomes ORDER BY name, number`);
  const comments = await db.query(`
SELECT users.username, users.avatar, articles.title, articles.img, comments.content, comments.id 
FROM ((comments
INNER JOIN users ON users.id = comments.author_id)
INNER JOIN articles ON articles.id = comments.article_id)
order by articles.title`);
  const messages = await db.query(`select * from messages`);


  res.json({
    status: 200,
    layout: 'adminLayout',
    status: 200,
    dbusers: users,
    dbarticles: articles
    // dbtomes: tomes,
    // dbcommentaires: comments,
    // dbmessages: messages,
  })
}

/*
 * ADMIN - CRUD
 * **************************** */


/******** GESTION USERS *********/

// Editer un User
exports.editUserID = async (req, res) => {
  console.log('edit User', req.body, req.params, req.query);

  await db.query(`
  UPDATE users
  SET username = '${req.body.username}', mail = '${req.body.mail}'
  WHERE id ='${req.params.id}';`);
  res.json({
    status: 200
  })
}

// Bannir / Débannir un User
exports.banUserID = async (req, res) => {

  const user = await db.query(`SELECT * from users where id = '${req.params.id}'`)
  console.log('mon user', user);


  if (user[0].isBan === 0) {
    await db.query(`UPDATE users SET isBan = 1 WHERE id ='${req.params.id}';`), console.log(' Banni !');
  }

  if (user[0].isBan === 1) {
    await db.query(`UPDATE users SET isBan = 0 WHERE id ='${req.params.id}';`), console.log('Débanni !');
  };

  res.json({
    status: 200
  })
}



/******* GESTION ARTICLES ********/

// Créer un Article
exports.createArticleAdmin = async (req, res) => {
  // console.log("new article", req.body);
  const { title, name, genre_1, genre_2, synopsis, img } = req.body

  // console.log('keys', title, name, genre_1, genre_2, synopsis);

  await query(`
    insert into articles (title, name, img, genre_1, genre_2, synopsis)
      VALUES ("${title}", "${name}", "${img}", "${genre_1}","${genre_2}", "${synopsis}");
  `)

  res.json({ 
    status:200,
    dbarticles: await query('select * from articles') })
}

// Effacer un Article
exports.deleteArticleID = async (req, res) => {

  // On sélectionne l'article dans la DB pour le supprimer
const article = await query(`select * from articles WHERE  id = ${ req.params.id };
`)


await query(`delete from articles where id = ${ req.params.id }`)


  // On cherche l'Img de l'article dans le Directory pour la supprimer
  // const dir = path.join('./public/images/Articles')
  // deleteOneFile(dir, article[0].img)

  // console.log('delete article', req.body, req.params, req.query, req.file)

  res.json({ 
  dbarticles: await query('select * from articles'), 
  status: 200 
})
}

// Editer un Article
exports.editArticleID = async (req, res) => {
  // console.log("On édite:", req.body)

  const id = req.params.id

  const { title, genre_1, genre_2, synopsis, img } = req.body

  // const article = query(`SELECT * FROM articles WHERE id = ${id}`)

  if (title, genre_1, genre_2, synopsis, img) {
    query(`UPDATE articles SET title = '${title}', genre_1 = '${genre_1}', genre_2 = '${genre_2}', synopsis = '${genre_2}', img = ${img}  WHERE id = ${id};`)
  }

  // if (img) {
  //   const dir = path.join('./public/images/Articles')
  //   deleteOneFile(dir, article[0].img)
  //   await db.query(`UPDATE articles SET img = '${req.file.filename}' WHERE id = ${id}`)
  // }

  // console.log('update article', req.body, req.params, req.query)
  res.json({ 
    status : 200,
    dbarticles: await query(`select * from articles`) })

}


/***** GESTION TOMES ******/

// Créer un Tome
exports.createTome = async (req, res) => {

  const {
    number,
    name
  } = req.body

  const tomes = await db.query(`
  SELECT articles.name,tomes.id, tomes.name, tomes.number, tomes.img
  FROM  tomes
  INNER JOIN articles 
  ON tomes.name = articles.name
  ORDER BY tomes.number; `)

  const id = tomes[0].id

  await db.query(`insert into tomes (name, number, img )
  VALUES ('${name}','${number}','${req.file.filename}')
  `)

  res.json({
    status: 200
  })
};

// Editer un Tome
exports.editTomeID = async (req, res) => {
  console.log("On édite:", req.params.id, req.body)

  const id = req.params.id
  const {
    name,
    number
  } = req.body
  const img = req.file


  const tomes = await db.query(`SELECT * FROM tomes WHERE id = ${id}`)

  if (name, number) {
    await db.query(`UPDATE tomes SET name = '${name}', number = '${number}' WHERE id = ${id};`)
  }

  if (img) {
    const dir = path.join('./public/images/Tomes')
    deleteOneFile(dir, tomes[0].img)
    await db.query(`UPDATE tomes SET img = '${req.file.filename}' WHERE id = ${id}`)
  }

  console.log('update article', req.body, req.params, req.query, req.file)
  res.json({
    status: 200
  })
}

// Supprime un Tome
exports.deleteTomeID = async (req, res) => {

  // On sélectionne l'article dans la DB pour le supprimer
  const tomes = await db.query(`select * from tomes WHERE  id = ${ req.params.id };`)
  await db.query(`delete from tomes where id = ${ req.params.id }`)


  // On cherche l'Img de l'article dans le Directory pour la supprimer
  const dir = path.join('./public/images/Tomes')
  deleteOneFile(dir, tomes[0].img)

  console.log('delete article', req.body, req.params, req.query, req.file)
  res.json({
    status: 200
  })
}



/***** GESTION COMMENTAIRES ******/

// Effacer un Commentaire
exports.deleteCommentID = async (req, res) => {
  await db.query(`delete from comments where id = ${ req.params.id } `)
  console.log('delete comment', req.body, req.params, req.query)
  res.json({
    status: 200
  })
}



/******* GESTION MESSAGES ********/

// Effacer un Message
exports.deleteMessageID = async (req, res) => {
  await db.query(`delete from messages where id = ${ req.params.id } `)
  console.log('delete comment', req.body, req.params, req.query)
  res.json({
    status: 200
  })
}