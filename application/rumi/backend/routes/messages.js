var express = require("express");
const { authentication } = require("../middleware/authetication");
var router = express.Router();
var MessageModel = require("../models/messages");

router.get("/", authentication, function (req, res, next) {
  let loginUserId = req.headers.loginUserId;
  let isAdmin = req.headers.admin;
  let from_id = req.query.from_id;
  let to_id = req.query.to_id;

  if (!from_id || !from_id.length) {
    return res.status(400).send({ message: "from_id should not be null" });
  }
  if (!to_id || !to_id.length) {
    return res.status(400).send({ message: "to_id should not be null" });
  }

  if (!isAdmin && (from_id != loginUserId || to_id != loginUserId)) {
    return res
      .status(401)
      .send({ message: "Yon have no privilege to create this comment." });
  }

  MessageModel.search(from_id, to_id)
    .then((results) => {
      if (results && results.length) {
        res.send({
          resultsStatus: "info",
          message: `${results.length} messages found`,
          results: results,
        });
      } else {
        res.send({
          resultsStatus: "info",
          message: `0 message found`,
        });
      }
    })
    .catch((err) => next(err));
});

router.get("/unread", authentication, function (req, res, next) {
  let loginUserId = req.headers.loginUserId;
  let isAdmin = req.headers.admin;
  let to_id = req.query.to_id;

  if (!to_id || !to_id.length) {
    return res.status(400).send({ message: "to_id should not be null" });
  }

  if (!isAdmin && (from_id != loginUserId || to_id != loginUserId)) {
    return res
      .status(401)
      .send({ message: "Yon have no privilege to create this comment." });
  }

  MessageModel.searchUnread(to_id)
    .then((results) => {
      if (results && results.length) {
        res.send({
          resultsStatus: "info",
          message: `${results.length} messages found`,
          results: results,
        });
      } else {
        res.send({
          resultsStatus: "info",
          message: `0 message found`,
        });
      }
    })
    .catch((err) => next(err));
});

router.post("/", authentication, function (req, res, next) {
  let loginUserId = req.headers.loginUserId;
  let isAdmin = req.headers.admin;
  let text = req.body.text;
  let from_id = req.body.from_id;
  let to_id = req.body.to_id;

  if (!text || !text.length) {
    return res.status(400).send({ message: "Comment should not be null" });
  }
  if (!from_id || !from_id.length) {
    return res.status(400).send({ message: "from_id should not be null" });
  }
  if (!to_id || !to_id.length) {
    return res.status(400).send({ message: "to_id should not be null" });
  }

  if (!isAdmin && to_id != loginUserId) {
    return res
      .status(401)
      .send({ message: "Yon have no privilege to create this comment." });
  }

  return MessageModel.create(text, from_id, to_id)
    .then((results) => {
      if (results && results.affectedRows) {
        res.send({
          id: results.insertId,
          message: `Message is created`,
        });
      } else {
        res.status(400).send({
          message: `Message creation failed`,
        });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
