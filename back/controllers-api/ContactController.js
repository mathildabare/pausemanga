/*
 * Controller: CONTACT
 * ******************* */



/***** PAGE *****/

// Page Contact
exports.contactpage = async (req, res) => {
  console.log('je suis la page contact')
  const message = await db.query(`
  SELECT * FROM messages;
`)
res.json({
  status : 200
})};



/**** CRUD ****/

// Créer un Message
exports.createMessage = async (req, res) => {
  console.log("Message du formulaire", req.body);
  const {name, mail, status, content} = req.body
  
  await db.query(`
    insert into messages (name, mail, status, content)
      VALUES ("${name}","${mail}","${status}","${content}");
  `)
  res.json({
    status : 200
  })}
