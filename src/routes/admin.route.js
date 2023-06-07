
const { Router } = require("express");
const { adminLogin, adminRegister } = require("../controllers/admin.controller");

const router = Router();

router.post("/auth/adminregister", adminRegister);
router.post("/auth/adminlogin", adminLogin);

module.exports = router;
