
const { Router } = require("express");
const { Create, getAll } = require("../controllers/product.controller");
const { isAuth } = require("../middlewares/isAuth.middleware");

const router = Router();

router.get("/get-all", isAuth, getAll);
router.post("/create", isAuth, Create);

module.exports = router;
