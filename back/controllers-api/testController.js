/*
 * Controller: ADMIN
 * **************** */


module.exports = {


  // PAGE ADMIN
  get: async (req, res) => {

    res.json({
      status: 200,
      dbarticles: await query(`SELECT * from articles order by id`)
    })
  },

  // POST ARTICLE
  post: async (req, res) => {

  const { title, name, genre_1, genre_2, synopsis, img } = req.body

  await query(`
  INSERT INTO articles (title, name, img, genre_1, genre_2, synopsis)
  VALUES ("${title}", "${name}", "${img}", "${genre_1}","${genre_2}", "${synopsis}");
  `)

  res.json({
    status: 200,
    dbarticles: await query('SELECT * from articles')
  })
  },

  // PUT ARTICLE
  put: async (req, res) => {

  const { id } = req.params
  const { title, genre_1, genre_2, synopsis, img } = req.body

    if (title, genre_1, genre_2, synopsis, img) {
      query(`
   UPDATE articles 
   SET title = '${title}', name = '${title}', genre_1 = '${genre_1}', genre_2 = '${genre_2}', synopsis = '${synopsis}', img = '${img}' 
   WHERE id = ${id};`)
    }

    res.json({
      status: 200,
      dbarticles: await query(`select * from articles`)
    })

  },

  // DELETE ARTICLE
  delete: async (req, res) => {

    const article = query(`SELECT * from articles WHERE  id = ${ req.params.id };`)

    await query(`DELETE from articles WHERE id = ${ req.params.id }`)

    res.json({
      status: 200,
      dbarticles: await query('select * from articles')
    })
  }
}