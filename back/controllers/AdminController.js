/*
 * Controller: ADMIN
 * **************** */

// FS Files
const fs = require("fs");
const path = require('path')
const directory = path.resolve("./public/images/Articles")

// Utils Files
const { deleteOneFile } = require('../utils/deleteOneFile')





/******** PAGE ADMIN *********/

// Page Admin
exports.get = async (req, res) => {
  res.render('admin', {
    layout: 'adminLayout',
    users: await query(`select * from users`),
    articles: await query(`select * from articles order by title`),
    messages: await query(`select * from messages`),
    comments: await query(`
    SELECT users.username, users.avatar, articles.title, articles.img, comments.content, comments.id 
    FROM ((comments
    INNER JOIN users ON users.id = comments.author_id)
    INNER JOIN articles ON articles.id = comments.article_id)
    order by articles.title`),
    tomes: await query(`select * from tomes ORDER BY name, number`),
  })
}



/******** GESTION USERS *********/

// Editer un User
exports.editUserID = async (req, res) => {
  console.log('edit User', req.body, req.params, req.query);

  await db.query(`
  UPDATE users
  SET username = '${req.body.username}', mail = '${req.body.mail}'
  WHERE id ='${req.params.id}';`);
  res.redirect('/admin#user');
}

// Bannir / Débannir un User
exports.banUserID = async (req, res) => {
  const user = await db.query(`SELECT * from users where id = '${req.params.id}'`)
  // console.log('mon user', user);

  if (user[0].isBan === 0) {
    await db.query(`UPDATE users SET isBan = 1 WHERE id ='${req.params.id}';`), console.log(' Banni !');
  }
  if (user[0].isBan === 1) {
    await db.query(`UPDATE users SET isBan = 0 WHERE id ='${req.params.id}';`), console.log('Débanni !');
  };
  res.redirect('/admin#user');
}



/******* GESTION ARTICLES ********/

// Créer un Article
exports.createArticleAdmin = async (req, res) => {
  console.log("new article", req.body, req.params, req.file);
  const { title, genre_1, genre_2, synopsis } = req.body
  const img = req.file.filename.split('.').slice(0, -1).join('.') + ".webp"

  await db.query(`
    insert into articles (title, name, img, genre_1, genre_2, synopsis)
      VALUES ( :title, :title, "${img}", "${genre_1}","${genre_2}", :synopsis);`, { synopsis, title })

  res.redirect("/admin#blog");
}

// Editer un Article
exports.editArticleID = async (req, res) => {
  // console.log("On édite:", req.params.id, req.body)

  const id = req.params.id
  const { title, genre_1, genre_2, synopsis } = req.body
  const img = req.file

  const article = await db.query(`SELECT * FROM articles WHERE id = ${id}`)

  if (title, genre_1, genre_2, synopsis) {
    await db.query(`UPDATE articles SET title =:title, genre_1 = '${genre_1}', genre_2 = '${genre_2}', synopsis =:synopsis WHERE id = ${id};`, {
      title, synopsis
    })
  }
  if (img) {
    const dir = path.join('./public/images/Articles')
    deleteOneFile(dir, article[0].img)
    await db.query(`UPDATE articles SET img = '${req.file.filename.split('.').slice(0, -1).join('.') + ".webp"}' WHERE id = ${id}`)
  }

  // console.log('update article', req.body, req.params, req.query, req.file)
  res.redirect('/admin#blog');
}

// Supprimer un Article
exports.deleteArticleID = async (req, res) => {

  // On sélectionne l'article dans la DB pour le supprimer
  const article = await db.query(`select * from articles WHERE  id = ${ req.params.id };`)
  await db.query(`delete from articles where id = ${ req.params.id }`)


  // On cherche l'Img de l'article dans le Directory pour la supprimer
  const dir = path.join('./public/images/Articles')
  deleteOneFile(dir, article[0].img)

  // console.log('delete article', req.body, req.params, req.query, req.file)
  res.redirect('/admin#blog');
}



/***** GESTION TOMES ******/

// Créer un Tome
exports.createTome = async (req, res) => {

  const { number, name } = req.body
  const img = req.file.filename.split('.').slice(0, -1).join('.') + ".webp"

  const tomes = await db.query(`
  SELECT articles.name,tomes.id, tomes.name, tomes.number, tomes.img
  FROM  tomes
  INNER JOIN articles 
  ON tomes.name = articles.name
  ORDER BY tomes.number; `)

  await db.query(`insert into tomes (name, number, img )
  VALUES ('${name}','${number}','${img}')
  `)

  res.redirect(`/admin#tomes`);
};

// Editer un Tome
exports.editTomeID = async (req, res) => {
  console.log("On édite:", req.params.id, req.body)

  const id = req.params.id
  const { name, number } = req.body
  const img = req.file


  const tomes = await db.query(`SELECT * FROM tomes WHERE id = ${id}`)

  if (name, number) {
    await db.query(`UPDATE tomes SET name = '${name}', number = '${number}' WHERE id = ${id};`)
  }

  if (img) {
    const dir = path.join('./public/images/Tomes')
    deleteOneFile(dir, tomes[0].img)
    await db.query(`UPDATE tomes SET img = '${req.file.filename.split('.').slice(0, -1).join('.') + ".webp"}' WHERE id = ${id}`)
  }

  console.log('update article', req.body, req.params, req.query, req.file)
  res.redirect('/admin#tomes');
}

// Supprimer un Tome
exports.deleteTomeID = async (req, res) => {

  // On sélectionne l'article dans la DB pour le supprimer
  const tomes = await db.query(`select * from tomes WHERE  id = ${ req.params.id };`)
  await db.query(`delete from tomes where id = ${ req.params.id }`)


  // On cherche l'Img de l'article dans le Directory pour la supprimer
  const dir = path.join('./public/images/Tomes')
  deleteOneFile(dir, tomes[0].img)

  console.log('delete article', req.body, req.params, req.query, req.file)
  res.redirect('/admin#tomes');
}



/***** GESTION COMMENTAIRES ******/

// Supprimer un Commentaire
exports.deleteCommentID = async (req, res) => {
  await db.query(`delete from comments where id = ${ req.params.id } `)
  // console.log('delete comment', req.body, req.params)
  res.redirect('/admin#comments');
}



/******* GESTION MESSAGES ********/

// Supprimer un Message
exports.deleteMessageID = async (req, res) => {
  await db.query(`delete from messages where id = ${ req.params.id } `)
  // console.log('delete comment', req.body, req.params)
  res.redirect('/admin#messages');
}