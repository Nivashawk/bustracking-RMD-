const express = require("express");
const router = express.Router();
const StudentController = require("../controller/student.controller");
const validation = require("../middleware/validate.middleware");

router.post("/create", StudentController.create);
router.post("/login", StudentController.login);
router.post("/detail", StudentController.studentDetail);


module.exports = router;
