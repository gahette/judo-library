/************************************/
/*** Import des modules nécessaires */
/************************************/

const Technique = require('../models/technique')


/***************************************/
/*** Routage de la ressource Technique */
/***************************************/

exports.getAllTechnique = (req, res) => {
    Technique.findAll()
        .then(techniques => res.json({data: techniques}))
        .catch(err => res.status(500).json({message: 'Database Error', error: err}))
}

exports.getTechnique = async (req, res) => {
    let techniqueId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!techniqueId) {
        return res.json(400).json({message: 'Missing Parameter'})
    }

    try {

        // Récupération de la technique
        let technique = await Technique.findOne({where: {id: techniqueId}, raw: true})

        // Test si résultat
        if (technique === null) {
            return res.status(404).json({message: 'This technique does not exist !'})
        }

        // Technique trouvée
        return res.json({data: technique})
    } catch
        (err) {
        return res.status(500).json({message: 'Database Error', error: err})
    }
}

exports.addTechnique = async (req, res) => {
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

    try {
        // Vérification si la technique existe déjà
        let technique = await Technique.findOne({where: {name: name}, raw: true})
        if (technique !== null) {
            return res.status(409).json({message: `The technique  ${name} already exists !`})
        }

        // Création de la technique
        technique = await Technique.create(req.body)
        return res.json({message: `Technique Created`, data: technique})
    }catch (err){
        return res.status(500).json({message: 'Database Error', error: err})
    }
}

exports.updateTechnique = async (req, res) => {
    let techniqueId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!techniqueId) {
        return res.status(400).json({message: `Missing parameter`})
    }

    try {
        // Recherche de la technique
        let technique = await Technique.findOne({where: {id: techniqueId}, raw: true})
        // Vérifier si la technique existe
        if (technique === null) {
            return res.status(404).json({message: `This technique does not exist !`})
        }
        // Mise à jour de la technique
        technique = await Technique.update(req.body, {where: {id: techniqueId}})
        return res.json({message: `Technique Updated`})
    } catch (err) {
        return res.status(500).json({message: `Database Error`, error: err})
    }
}

exports.untrashTechnique = (req, res) => {
    let techniqueId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!techniqueId) {
        return res.status(400).json({message: `Missing parameter`})
    }

    Technique.restore({where: {id: techniqueId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({message: `Database Error`, error: err}))
}

exports.trashTechnique = (req, res) => {
    let techniqueId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!techniqueId) {
        return res.status(400).json({message: `Missing parameter`})
    }

    // Suppression de la technique
    Technique.destroy({where: {id: techniqueId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({message: `Database Error`, error: err}))
}

exports.deleteTechnique = (req, res) => {
    let techniqueId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!techniqueId) {
        return res.status(400).json({message: `Missing parameter`})
    }

    // Suppression de la technique
    Technique.destroy({where: {id: techniqueId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({message: `Database Error`, error: err}))
}
