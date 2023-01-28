const Items = require("../schema/items.model").model; // on récupère le modèle

const list = async (_, res) => {
  try {
    const allItem = await Items.find(); // "await" le résultat de Item.find() qui est asynchrone
    res.render("allItems", {
      title: "Item list",
      items: allItem, // le résultat peut-être utilisé dans 'allitems.pug'
    });
  } catch (e) {
    res.status(400).json(e);
  }
};

const allItems = async (_, res) => {
  Items.find() // we find item by id according to param
    .then((items) => res.status(200).json(items))
    .catch((error) => res.status(400).json(error));
};

const createItem = async (req, res, _) => {
  var ObjectID = require("mongodb").ObjectID;
  const newItemData = { ...req.body };
  newItemData.id_owner = ObjectID(newItemData.id_owner);
  Items.create(newItemData)
    .then((createdItem) => res.status(200).json(createdItem)) //  responds with code 200 and sends created item
    .catch((error) => res.status(400).json(error)); // if creation fails => responds with code 400
};

const addDetails = async (req, res) => {
  Items.findById(req.params.itemId) // we find item by id according to param
    .then((item) => {
      item.details = details; // item details are changed accroding to received data
      return item.save(); // item is saved => details are updated
    })
    .then((item) => res.status(200).json(item))
    .catch((error) => res.status(400).json(error));
};

const update = async (req, res) => {
  const updatedItemData = { ...req.body }; // new value for item is received from client
  Items.findByIdAndUpdate(req.params.itemId, updatedItemData, { new: true }) // updating is done
    .then(() => res.status(200).json({ id: req.params.itemId }))
    .catch((error) => res.status(400).json(error));
};

const getItemSell_Other = async (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  const id = ObjectID(req.params.userId);
  Items.find({ sell: false, id_owner: { $ne: id } })
    .then((items) => res.status(200).json(items))
    .catch((e) => res.status(400).json(e)); // select all the documents that match the given property, here pseudo > *from*
};

const getItemsForThisUser = async (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  const id = ObjectID(req.params.userId);
  Items.find({ id_owner: id })
    .then((items) => res.status(200).json(items))
    .catch((e) => res.status(400).json(e)); // select all the documents that match the given property, here pseudo > *from*
};

const buy = async (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  const objId = { ...req.body };
  const id = ObjectID(req.params.itemId);
  const id_owner = ObjectID(objId.id);
  Items.updateMany({ _id: id }, { $set: { sell: true, id_owner: id_owner } })
    .then(() => res.status(200).json({ id: req.params.itemId }))
    .catch((error) => res.status(400).json(error));
};

const sell = async (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  const isSell = req.body.sell;
  const id = ObjectID(req.params.itemId);
  Items.findByIdAndUpdate(id, { $set: { sell: isSell } })
    .then(() => res.status(200).json({ id: req.params.itemId }))
    .catch((error) => res.status(400).json(error));
};

/*
 * deleting
 */
const deleteItem = async (req, res) => {
  await Items.findByIdAndRemove(req.params.itemId)
    .then((e) => res.status(200).json(e))
    .catch((e) => res.status(400).json(e));
};

module.exports.list = list;
module.exports.allItems = allItems;
module.exports.create = createItem;
module.exports.addDetails = addDetails;
module.exports.update = update;
module.exports.delete = deleteItem;
module.exports.sellOther = getItemSell_Other;
module.exports.getItemUsers = getItemsForThisUser;
module.exports.buy = buy;
module.exports.sell = sell;
