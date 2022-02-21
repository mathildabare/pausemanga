/*
 * Controller: Node Mailer
 * ************************** */



/**** IMPORTS ****/

// Node Mailer
const nodemailer = require("nodemailer");

// BCRYPT
const bcrypt = require('bcrypt');
const saltRounds = 10;



/** PAGES **/

module.exports = {

    // POST MDP Oublié
    lostpassword: async (req, res) => {

        const user = await db.query(`SELECT * FROM users WHERE mail = '${req.body.mail}'`)
        const host = req.get('host')
        const rand = Math.floor((Math.random() * 100) + 54)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pausemanga.test@gmail.com',
                pass: '@hibarikyoya4927'
            }
        });
        req.session.visitor = {
            id: rand,
            userID: user[0].id
        }
        req.session.cookie.maxAge = 900000

        console.log('Visitor : ', req.session.visitor.userID)

        link = "http://" + req.get('host') + "/resetpassword/" + req.session.visitor.id
        if (user.length > 0) {


            const mailOptions = {
                from: 'pausemanga.test@gmail.com',
                to: req.body.mail,
                subject: `'Vous avez demandé à réinitialiser votre mot de passe, ' + ${user[0].username}`,
                rand: req.session.visitor.id,
                html: `
              <p>click above the link to rest your password </p><br>
              <a href="${link}">Click here</a>`
            }

            transporter.sendMail(mailOptions, async (err, info, next) => {
                if (err) res.status(404)
                else {
                    console.log(info)
                    const mailSend = true
                    res.render('home', {
                        mailSend,
                        message: await db.query('select * from messages'),
                        articles: await db.query('select * from articles')
                    })

                }
            })
        }
    },

    // Page MDP Oublié
    lostpasswordPage: (req, res) => {
        console.log('Password')
        res.render('lostpassword')
    },

    // Page Reset MDP
    resetpasswordPage: async (req, res) => {

        console.log('Reset passwor 1', req.protocol + "://" + req.get('host'), "  ||  ", "http://" + req.get('host'))

        // Ici on check notre protocole hébergeur (nodejs localhost) et le lien généré dans le mail
        if (req.protocol + "://" + req.get('host') === "http://" + req.get('host')) {
            console.log("Domain is matched. Information is from Authentic email")

            const userID = await db.query(`SELECT id FROM users WHERE id = '${req.params.id}'`)

            console.log('edit Password (reset)', req.params.id, req.session)

            if (Number(req.params.id) === Number(req.session.visitor.id)) {
                res.render('resetpassword', {
                    rand: req.session.visitor.id
                })

            } else {
                console.log("Mauvaise requête")
                res.redirect('/')
            }
        }
    },

    // POST : Reset MDP
    resetpassword: async (req, res) => {
        const {
            password,
            confirmPassword
        } = req.body
        const hash = bcrypt.hashSync(password, 10)

        console.log("controller reset password")
        console.log('mon hash : ', hash)

        if (password !== confirmPassword) {
            res.redirect('back')
        } else {

            const visitor = req.session.visitor.userID;

            console.log("visitor: ", visitor);
            await db.query(`UPDATE users SET password = '${hash}' WHERE id = ${visitor}`, function (err) {
                const changePassword = true
                const userID = req.params.id

                console.log('visitor userID: ', req.session.visitor.userID)
                req.session.destroy(() => {
                    res.clearCookie('math-session')
                })
                res.render('home', {
                    changePassword,
                    userID,
                    modalLoginOpen: "Votre mot de passe à bien été édité !!"
                })
            })
        }
    }
}
