/************************************/
/*** Import des modules nécessaires */
/************************************/

const {DataTypes} = require('sequelize')
const DB = require('../db.config')
const bcrypt = require("bcrypt");


/*******************************/
/*** Définition du modèle User */
/*******************************/
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
            is
    :
        /^[0-9a-f]{64}$/i              // Ici une contrainte
    }
}, {paranoid: true})              // Ici pour faire du softDelete

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
})

User.checkPassword = async (password, origine1) => {
    return await bcrypt.compare(password, origine1)
}


/*******************************/
/*** Synchronisation du modèle */
/*******************************/

// User.sync()
// User.sync({force: true})
// User.sync({alter: true})

module.exports = User