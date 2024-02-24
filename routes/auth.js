/****************/
/*** Import des modules nécessaires */
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

/****************/
/*** Récupération du router d'express */
let router = express.Router()

/****************/
/*** Routage de la resource Auth */
router.post('/login', (req, res) => {
    const {email, password} = req.body

    //Validation des données reçues
    if (!email || !password) {
        return res.status(400).json({message: 'Bad email or password'})
    }

    User.findOne({where: {email: email}, raw: true})
        .then(user => {
            //Vérification si l'utilisateur existe
            if (user === null) {
                return res.status(401).json({message: 'This account does not exist !'})
            }

            // Vérification du mot de passe
            bcrypt.compare(password, user.password)
                .then(test => {
                    if (!test) {
                        return res.status(401).json({message: 'Wrong password'})
                    }

                    // Génération du token
                    const token = jwt.sign({
                        id: user.id,
                        lastName: user.lastName,
                        firstName: user.firstName,
                        email: email
                    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_DURING})
                    return res.json({access_token: token})
                })
                .catch(err => res.status(500).json({message: 'Login process failed', error: err}))
        })
        .catch(err => res.status(500).json({message: 'Database Error', error: err}))
})

module.exports = router