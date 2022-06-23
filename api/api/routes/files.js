const express = require("express");
const { getListFiles, download } = require("../controllers/files");
const router = express.Router();

router.get("/", getListFiles);
router.get("/:name", download);

module.exports = router;
