/****************/
/*** Import des modules nécessaires */
const express = require('express')
const cors = require('cors')

/*** Import de la connexion à la DB */
let DB = require('./db.config')

/****************/
/*** Initialisation de l'API */
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/****************/
/*** Import des modules de routage */
const user_router = require('./routes/users')

/****************/
/*** Mise en place du routage */
app.get('/', (req, res) => res.send(`I'm online. All is OK !`))

app.get('*', (req, res) => res.status(501).send(`What the hell are you doing !?!`))

app.use('/users', user_router)

/****************/
/*** Start serveur avec test DB */
DB.authenticate()
    .then(() => console.log('Database connection OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}. Have fun !`)
        })
    })
    .catch(err => console.log('Database Error', err))


