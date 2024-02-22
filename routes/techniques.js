/****************/
/*** Import des modules nécessaires */
const express = require('express')

const Technique = require('../models/technique')

/****************/
/*** Récupération du router d'express */
let router = express.Router()

/****************/
/*** Routage de la ressource Technique */
router.get('', (req, res) => {
    Technique.findAll()
        .then(techniques => res.json({data: techniques}))
        .catch(err => res.status(500).json({message: 'Database Error', error: err}))
})

router.get('/:id', (req, res) => {
    let techniqueId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!techniqueId) {
        return res.json(400).json({message: 'Missing Parameter'})
    }

    // Récupération de la technique
    Technique.findOne({where: {id: techniqueId}, raw: true})
        .then(technique => {
            if (technique === null) {
                return res.status(404).json({message: 'This technique does not exist !'})
            }

            // Technique trouvée
            return res.json({data: technique})
        })
        .catch(err => res.status(500).json({message: 'Database Error', error: err}))
})

router.put('', (req, res) => {
    const {
        user_id,
        name,
        group,
        subGroup,
        family,
        kyuGoKyoNoWaza,
        goKyoNoWaza,
        description,
        image,
        youtubeId
    } = req.body
    // Validation des données reçues
    if (!user_id || !name || !group || !subGroup || !family || !kyuGoKyoNoWaza || !goKyoNoWaza || !description || !image || !youtubeId) {
        return res.status(400).json({message: 'Missing Data'})
    }

    Technique.findOne({where: {name: name}, raw: true})
        .then(technique => {
            // Vérification si la technique existe déjà
            if (technique !== null) {
                return res.status(409).json({message: `The technique  ${name} already exists !`})
            }

            // Création de la technique
            Technique.create(req.body)
                .then(technique => res.json({message: `Technique Created`, data: technique}))
                .catch(err => res.status(500).json({message: `Database Error`, error: err}))
        })
        .catch(err => res.status(500).json({message: `Hash Process Error`, error: err}))
})

router.patch('/:id', (req, res) => {
    let techniqueId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!techniqueId) {
        return res.status(400).json({message: `Missing parameter`})
    }

    // Recherche de la technique
    Technique.findOne({where: {id: techniqueId}, raw: true})
        .then(technique => {
            // Vérifier si la technique existe
            if (technique === null) {
                return res.status(404).json({message: `This technique does not exist !`})
            }

            // Mise à jour de la technique
            Technique.update(req.body, {where: {id: techniqueId}})
                .then(technique => res.json({message: `Technique Updated`}))
                .catch(err => res.status(500).json({message: `Database Error`, error: err}))
        })
        .catch(err => res.status(500).json({message: `Database Error`, error: err}))
})

router.post('/untrash/:id', (req, res) => {
    let techniqueId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!techniqueId) {
        return res.status(400).json({message: `Missing parameter`})
    }

    Technique.restore({where: {id: techniqueId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({message: `Database Error`, error: err}))
})

router.delete('/trash/:id', (req, res) => {
    let techniqueId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!techniqueId) {
        return res.status(400).json({message: `Missing parameter`})
    }

    // Suppression de la technique
    Technique.destroy({where: {id: techniqueId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({message: `Database Error`, error: err}))
})

router.delete('/:id', (req, res) => {
    let techniqueId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!techniqueId) {
        return res.status(400).json({message: `Missing parameter`})
    }

    // Suppression de la technique
    Technique.destroy({where: {id: techniqueId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({message: `Database Error`, error: err}))
})

module.exports = router