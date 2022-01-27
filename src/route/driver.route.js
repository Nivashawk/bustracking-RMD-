const express = require("express");
const router = express.Router();
const DriverController = require("../controller/driver.controller");
const validation = require("../middleware/validate.middleware");

router.post("/create", DriverController.create);
router.post("/login", DriverController.login);
router.post("/detail", DriverController.driverDetail);
router.post("/updateTripStatus", DriverController.driverTripStatus);
router.post("/list", DriverController.driverList);
router.post("/assign", DriverController.assignDriver);
router.post("/unassign", DriverController.unassignDriver);
router.post("/emergency", DriverController.sendEmail);


module.exports = router;