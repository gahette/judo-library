/************************************/
/*** Import des modules nécessaires */
/************************************/
// noinspection ExceptionCaughtLocallyJS,JSCheckFunctionSignatures

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { AuthenticationError } = require("../error/customError");

/*********************************/
/*** Routage de la resource Auth */
/*********************************/

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Validation des données reçues
    if (!email || !password) {
      throw new AuthenticationError("Bad email or password", 0);
    }

    //Vérification si l'utilisateur existe
    let user = await User.findOne({ where: { email: email }, raw: true });
    if (user === null) {
      throw new AuthenticationError("This account does not exist !", 1);
    }

    // Vérification du mot de passe
    let test = await User.checkPassword(password, user.password);
    if (!test) {
      throw new AuthenticationError("Wrong password", 2);
    }

    // Génération du token et envoie
    const token = jwt.sign(
      {
        id: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_DURING },
    );
    return res.json({ access_token: token });
  } catch (err) {
    next(err);
    // if(err.name === 'SequelizeDatabaseError'){
    //     return res.status(500).json({message: 'Database Error', error: err})
    // }
    // return res.status(500).json({message: 'Login process failed', error: err})
  }
};
