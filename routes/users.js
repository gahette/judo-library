/************************************/
/*** Import des modules nécessaires */
/************************************/

const express = require('express')
const userController = require('../controllers/userController')

/**************************************/
/*** Récupération du router d'express */
/**************************************/

let router = express.Router()

/**********************************************/
/*** Middleware pour logger dates de requêtes */
/**********************************************/

router.use((req, res, next) => {
    const event = new Date()
    console.log('User Time:', event.toString())
    next()
})

/**********************************/
/*** Routage de la ressource User */
/**********************************/

router.get('/', userController.getAllUsers)

router.get('/:id', userController.getUser)

router.put('', userController.addUser)

router.patch('/:id', userController.updateUser)

router.post('/untrash/:id', userController.untrashUser)

router.delete('/trash/:id', userController.trashUser)

router.delete('/:id', userController.deleteUser)

module.exports = router