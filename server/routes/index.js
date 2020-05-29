const express = require("express");
const router = express.Router();
const storiesRouter = require("./storiesRouter");

router.use("/stories",storiesRouter);

module.exports = router;