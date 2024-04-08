/************************************/
/*** Import des modules nécessaires */
/************************************/

const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')

const {getAllTechnique, getTechnique, addTechnique, updateTechnique, untrashTechnique, trashTechnique, deleteTechnique} = require("../controllers/techniqueController");


/**************************************/
/*** Récupération du router d'express */
/**************************************/

let router = express.Router()


/**********************************************/
/*** Middleware pour logger dates de requêtes */
/**********************************************/

router.use((req, res, next) => {
    const event = new Date()
    console.log('Technique Time:', event.toString())
    next()
})


/***************************************/
/*** Routage de la ressource Technique */
/***************************************/

router.get('', getAllTechnique)

router.get('/:id', getTechnique)

router.put('', checkTokenMiddleware, addTechnique)

router.patch('/:id', checkTokenMiddleware, updateTechnique)

router.post('/untrash/:id', checkTokenMiddleware, untrashTechnique)

router.delete('/trash/:id', checkTokenMiddleware, trashTechnique)

router.delete('/:id', checkTokenMiddleware, deleteTechnique)

module.exports = router