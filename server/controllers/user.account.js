const Users = require("../schema/users.model").model;
const passwordHash = require("password-hash");

/**
 * Use to signup
 * @param {Object} req request
 * @param {Function} res response
 * @returns 400 or 200 if success
 */
async function signup(req, res) {
  const { password, pseudo, money } = req.body;
  if (!pseudo || !password) {
    //Le cas où l'pseudo ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "besoin de : pseudo & password",
      // pseudo: pseudo,
      // password: password,
    });
  }
  // Création d'un objet user, dans lequel on hash le mot de passe
  const user = {
    pseudo,
    password: passwordHash.generate(password),
    money
  };
  // On check en base si l'utilisateur existe déjà

  try {
    const findUser = await Users.findOne({
      pseudo,
    });
    if (findUser) {
      return res.status(400).json({
        text: "L'utilisateur existe déjà",
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde de l'utilisateur en base
    const userData = new Users(user);
    const userObject = await userData.save();
    return res.status(200).json({
      text: "Succès",
      token: userObject.getToken(),
      id: userObject._id,
      log: userObject.pseudo,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

/**
 * Use to login
 * @param {Object} req request
 * @param {Function} res response
 * @returns 400 or 200 if success
 */
async function login(req, res) {
  const { password, pseudo } = req.body;
  console.log(req.body);
  if (!pseudo || !password) {
    //Le cas où l'pseudo ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "besoin de : pseudo & password rempli",
      pseudo: pseudo,
      password: password,
    });
  }
  try {
    // On check si l'utilisateur existe en base
    const findUser = await Users.findOne({ pseudo });
    if (!findUser)
      return res.status(401).json({
        text: "L'utilisateur n'existe pas",
      });
    if (!findUser.authenticate(password))
      return res.status(401).json({
        text: "Mot de passe incorrect",
      });
    return res.status(200).json({
      token: findUser.getToken(),
      text: "Authentification réussi",
      id: findUser._id,
      log: findUser.pseudo,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

//On exporte nos deux fonctions

exports.login = login;
exports.signup = signup;
