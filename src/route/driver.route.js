const express = require("express");
const router = express.Router();
const DriverController = require("../controller/driver.controller");
const validation = require("../middleware/validate.middleware");

router.post("/create", DriverController.create);
router.post("/login", DriverController.login);
router.post("/list", DriverController.driverList);


module.exports = router;