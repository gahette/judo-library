/************************************/
/*** Import des modules nécessaires */
/************************************/

const express = require('express')
const authController = require('../controllers/authController')


/**************************************/
/*** Récupération du router d'express */
/**************************************/

let router = express.Router()


/**********************************************/
/*** Middleware pour logger dates de requêtes */
/**********************************************/

router.use((req, res, next) => {
    const event = new Date()
    console.log('AUTH Time:', event.toString())
    next()
})


/*********************************/
/*** Routage de la resource Auth */
/*********************************/

router.post('/login', authController.login)

module.exports = router