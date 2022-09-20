var express = require("express");
var router = express.Router();
var FileModel = require("../models/files");

router.get("/download", function (req, res, next) {
  res.download(FileModel.getFilePath(req.query.name));
});

module.exports = router;
