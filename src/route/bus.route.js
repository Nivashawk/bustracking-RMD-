const express = require("express");
const router = express.Router();
const BusController = require("../controller/bus.controller");
const validation = require("../middleware/validate.middleware");

router.post("/create", BusController.create);
router.post("/detail", BusController.busDetail);
router.post("/edit", BusController.editBusDetail);
router.post("/list", BusController.busList);


module.exports = router;