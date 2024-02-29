/************************************/
/*** Import des modules nécessaires */
/************************************/

const Technique = require('../models/technique')
const {RequestError, TechniqueError} = require('../error/customError')

/***************************************/
/*** Routage de la ressource Technique */
/***************************************/

exports.getAllTechnique = (req, res, next) => {
    Technique.findAll()
        .then(techniques => res.json({data: techniques}))
        .catch(err => next(err))
}

exports.getTechnique = async (req, res, next) => {
    try {
        let techniqueId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!techniqueId) {
            throw new RequestError('Missing parameter')

        }

        // Récupération de la technique
        let technique = await Technique.findOne({where: {id: techniqueId}, raw: true})

        // Test si résultat
        if (technique === null) {
            throw new TechniqueError('this technique does not exist !', 0)
        }

        // Renvoi de la technique trouvée
        return res.json({data: technique})
    } catch
        (err) {
        next(err)
    }
}

exports.addTechnique = async (req, res, next) => {
    try {
        const {user_id, name, group, subGroup, family, kyuGoKyoNoWaza, goKyoNoWaza, description, image, youtubeId} = req.body

        // Validation des données reçues
        if (!user_id || !name || !group || !subGroup || !family || !kyuGoKyoNoWaza || !goKyoNoWaza || !description || !image || !youtubeId) {
            throw new RequestError('Missing parameter')
        }

        // Vérification si la technique existe déjà
        let technique = await Technique.findOne({where: {name: name}, raw: true})
        if (technique !== null) {
            throw new TechniqueError(`The technique  ${name} already exists !`, 1)
        }

        // Création de la technique
        technique = await Technique.create(req.body)

        // Réponse de la technique créé
        return res.json({message: `Technique Created`, data: technique})
    } catch (err) {
        next(err)
    }
}

exports.updateTechnique = async (req, res, next) => {
    try {
        let techniqueId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!techniqueId) {
            throw new RequestError('Missing parameter')
        }

        // Recherche de la technique
        let technique = await Technique.findOne({where: {id: techniqueId}, raw: true})

        // Vérifier si la technique existe
        if (technique === null) {
            throw new TechniqueError('this technique does not exist !', 0)
        }

        // Mise à jour de la technique
        await Technique.update(req.body, {where: {id: techniqueId}})

        // Réponse de la mise à jour
        return res.json({message: `Technique Updated`})
    } catch (err) {
        next(err)
    }
}

exports.untrashTechnique = async (req, res, next) => {
    try {
        let techniqueId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!techniqueId) {
            throw new RequestError('Missing parameter')
        }

        await Technique.restore({where: {id: techniqueId}})

        // Réponse de la sortie de poubelle
        return res.status(204).json({})
    } catch (err) {
        next(err)
    }
}

exports.trashTechnique = async (req, res, next) => {
    try {
        let techniqueId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!techniqueId) {
            throw new RequestError('Missing parameter')
        }

        // Suppression de la technique
        await Technique.destroy({where: {id: techniqueId}})

        // Réponse de la mise en poubelle
        return res.status(204).json({})
    } catch (err) {
        next(err)
    }
}

exports.deleteTechnique = async (req, res, next) => {
    try {
        let techniqueId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!techniqueId) {
            throw new RequestError('Missing parameter')
        }

        // Suppression de la technique
        await Technique.destroy({where: {id: techniqueId}, force: true})

        // Réponse de la suppression
        return res.status(204).json({})
    } catch (err) {
        next(err)
    }
}
