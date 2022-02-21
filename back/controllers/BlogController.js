/*
 * Controller: BLOG
 * **************** */



/**** IMPORTS ****/

const fs = require("fs");
const path = require('path')
const directory = path.resolve("./public/images/Articles")



/***** PAGES ******/

// Page Article
exports.articlepage = async (req, res) => {
  console.log("je suis la page article");

  let nbArticles;
  let numPerPage = 8;
  let page = parseInt(req.query.page, 10) || 1;
  let numPages;
  let skip = (page-1) * numPerPage;
  let limit = skip + ',' + numPerPage;
  
  const allArticles = `SELECT count(*) as nbArticles FROM articles`;
  
  db.query(allArticles, (error, results, fields) => {
      nbArticles = results[0].nbArticles;
      numPages = Math.ceil(nbArticles / numPerPage);
    
      // console.log(numPerPage)
  })
  
  
  const articles = `SELECT * FROM articles ORDER BY title LIMIT ${limit}`
  db.query(articles, (error, results, fields) => {
  
  
      if (page <= numPages) {
  
        const Pagination = {
          current: page,
          first : page = 1,
          previous: page > 0 ? page - 1 : undefined,
          next: page < numPages ? page + 1 : undefined,
          last: page = numPages
      }
          res.render('article', {
              articles: results,
              page: Pagination
          })
      } else {
          res.redirect('article')
      }
  })
};

// Page Article:ID
exports.pageArticleID = async (req, res) => {
  const {
    id
  } = req.params
  console.log("je suis la page article/:id", req.params);

  const article = await db.query(`select * from articles where id = ${ id };`) //table articles + article.id
  const comments = await db.query(`  
  SELECT  users.username, users.avatar, comments.content, comments.article_id
  FROM users 
  INNER JOIN comments 
  ON users.id = comments.author_id
  WHERE article_id = ${id}; 
`) //table comments + article.id
  

  
  const tomes = await db.query(`
  SELECT  articles.name, tomes.name, tomes.number, tomes.img
  FROM articles 
  INNER JOIN tomes 
  ON articles.name = tomes.name 
  WHERE articles.id = ${req.params.id}
  ORDER BY tomes.number;`)


  console.log('article array', article)
  console.log('article obj', article[0])

  res.render("articleID", {
    article: article[0],
    comments, 
    tomes
  })
}



/***** CRUD ******/

// Créer un article
exports.createArticleUser = async (req, res) => {
  console.log("new article", req.body, req.params, req.query);
  const { title, genre_1, genre_2, synopsis } = req.body

  await db.query(`
    insert into articles (title, name, genre_1, genre_2, synopsis, img)
      VALUES ("${title}", "${title}", "${genre_1}","${genre_2}", :synopsis, "${req.file.filename}");`, {synopsis})
  res.redirect("/article");
}

// Créer un Commentaire
exports.createComment = async (req, res) => {

  console.log("Commentaire user", req.body);

  const { content } = req.body
  const { id } = req.params
  const author = req.session.user.id
  console.log('my author', author);

  await db.query(`
    insert into comments (author_id, content, article_id)
    VALUES ("${author}", :content , "${id}" );`, {content})
  console.log(`article/${id}`);

  res.redirect(`/article/${ id }#comments`);
};

