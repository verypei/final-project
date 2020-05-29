const express = require("express");
const router = express.Router();
const storiesController = require("../controllers/storiesController");

router.get("/",storiesController.getAllStories);
router.get("/detail/:id",storiesController.detailStories);
router.post("/",storiesController.postStories);
module.exports = router;
