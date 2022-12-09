const express = require("express");
const router = express.Router();
const TrackerController = require("../controller/tracker.controller");
const validation = require("../middleware/validate.middleware");

router.post("/updateLocation", TrackerController.updateLocation);

module.exports = router;
