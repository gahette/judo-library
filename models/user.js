/****************/
/*** Import des modules nécessaires */
const {DataTypes} = require('sequelize')
const DB = require('../db.config')

/****************/
/*** Définition du modèle User */
const User = DB.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lastName: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true                  // Ici une validation de données
        }
    },
    password: {
        type: DataTypes.STRING,
        is: /^[0-9a-f]{64}$/i              // Ici une contrainte
    }
}, {paranoid: true})              // Ici pour faire du softDelete

/****************/
/*** Synchronisation du modèle */
// User.sync()
// User.sync({force: true})
// User.sync({alter: true})

module.exports = User