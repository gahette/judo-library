/************************************/
/*** Import des modules nécessaires */
/************************************/

const { DataTypes } = require("sequelize");
const DB = require("../db.config");

/*******************************/
/*** Définition du modèle User */
/*******************************/
const Technique = DB.define(
  'Technique',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    group: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    subGroup: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    family: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    kyuGoKyoNoWaza: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    goKyoNoWaza: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "",
      allowNull: true,
    },
    youtubeId: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
  },
  { paranoid: true },
); // Ici pour faire du softDelete

/****************/
/*** Synchronisation du modèle */
// Technique.sync()
// Technique.sync({force: true})
// Technique.sync({alter: true})

module.exports = Technique;
