const Users = require("../schema/users.model").model; // on récupère le modèle

const list = async (_, res) => {
  const allUser = await Users.find(); // "await" le résultat de Users.find() qui est asynchrone
  console.log(allUser);
  res.render("allUsers", {
    title: "Users list",
    users: allUser, // le résultat peut-être utilisé dans 'allbooks.pug'
  });
};

const createUser = async (req, res, _) => {
  const newUserData = { ...req.body };
  Users.create(newUserData)
    .then((createdUser) => res.status(200).json(createdUser)) //  responds with code 200 and sends created user
    .catch((error) => res.status(400).json(error)); // if creation fails => responds with code 400
};

const addDetails = async (req, res) => {
  Users.findById(req.params.userId) // we find user by id according to param
    .then((user) => {
      user.details = details; // user details are changed accroding to received data
      return user.save(); // user is saved => details are updated
    })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json(error));
};

const update = async (req, res) => {
  const updatedUserData = { ...req.body }; // new value for user is received from client
  Users.findByIdAndUpdate(req.params.userId, updatedUserData, { new: true }) // updating is done
    .then(() => res.status(200).json({ id: req.params.userId }))
    .catch((error) => res.status(400).json(error));
};

/*
 * deleting
 */
const deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndRemove(req.params.userId).remove();
    console.log(`--> User ${req.params.userId} deleted`);
    res.status(301).redirect("/users");
  } catch (error) {
    console.log(error);
  }
};

/* controller for /users/find/:pseudo find uses where pseudo */
const getUserByPseudo = async (req, res) => {
  Users.find({ pseudo: req.params.pseudo })
    .then((user) => res.status(200).json(user))
    .catch((e) => res.status(400).json(e)); // select all the documents that match the given property, here pseudo > *from*
};

const findUser = async (req, res) => {
  Users.findById(req.params.userId) // we find user by id according to param
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json(error));
};

const updateWallet = async (req, res) => {
  const wallet = req.body.money; // new value for user is received from client
  Users.findByIdAndUpdate(req.params.userId, { money: wallet }) // updating is done
    .then(() => res.status(200).json({ id: req.params.userId }))
    .catch((error) => res.status(400).json(error));
};


module.exports.list = list;
module.exports.create = createUser;
module.exports.addDetails = addDetails;
module.exports.update = update;
module.exports.delete = deleteUser;
module.exports.getUserP = getUserByPseudo;
module.exports.find = findUser;
module.exports.updateMoney = updateWallet;
