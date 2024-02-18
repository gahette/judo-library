/****************/
/*** Import des modules nécessaires */
const express = require('express')
const cors = require('cors')

/****************/
/*** Initialisation de l'API */
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/****************/
/*** Mise en place du routage */
app.get('/', (req, res) => res.send(`I'm online. All is OK !`))

app.get('*', (req, res) => res.status(501).send(`What the hell are you doing !?!`))

/****************/
/*** Start serveur */
app.listen(process.env.SERVER_PORT, () => {
console.log(`This server is running on port ${process.env.SERVER_PORT}. Have fun !`)
})


