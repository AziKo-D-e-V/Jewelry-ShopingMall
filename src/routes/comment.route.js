
const { Router } = require("express");
const { isAuth } = require("../middlewares/isAuth.middleware");
const { createComment, getAllComment } = require("../controllers/comment.controller");

const router = Router();

router.get("/get-all-comment", isAuth, getAllComment);
router.post("/comment", isAuth, createComment);

module.exports = router;
