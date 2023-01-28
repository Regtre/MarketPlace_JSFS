const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items.controller");

router.get("/", itemsController.list);

// path '/items/create' can be accessed using GET (for view) or POST (for item creation)
// router.get('/create', itemsController.createForm );
router.post("/create", itemsController.create);

// path '/items/adddetails/:itemId' can be accessed using GET (for item details view) or POST (for item details creation)
// router.get('/adddetails/:itemId', itemsController.addDetailsForm );
router.post("/addetails/:itemId", itemsController.addDetails);

// use method PUT for an update request
// router.get('/update/:itemId', itemsController.updateForm );
router.put("/update/:itemId", itemsController.update);

// remove document
router.delete("/delete/:itemId", itemsController.delete);

// sell items
router.get("/other/:userId", itemsController.sellOther);
router.get("/all", itemsController.allItems);

router.put("/buy/:itemId", itemsController.buy);
router.put("/sell/:itemId", itemsController.sell);
router.get("/self/:userId", itemsController.getItemUsers);

module.exports = router;
