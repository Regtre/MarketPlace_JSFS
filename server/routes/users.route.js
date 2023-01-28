const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const account = require("../controllers/user.account");

router.get("/", usersController.list);
router.post("/login", account.login);

router.post("/signup", account.signup);
router.post("/adddetails/:userId", usersController.addDetails);

router.put("/update/:userId", usersController.update);

router.delete("/delete/:userId", usersController.delete);
router.get("/find/:userId", usersController.find);
router.put("/wallet/:userId", usersController.updateMoney);

module.exports = router;
