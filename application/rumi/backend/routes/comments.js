var express = require("express");
const { authentication } = require("../middleware/authetication");
var router = express.Router();
var CommentModel = require("../models/comments");

router.get("/", function (req, res, next) {
  let id = req.query.id;
  let creator_id = req.query.creator_id;
  let post_id = req.query.post_id;

  CommentModel.search(id, creator_id, post_id)
    .then((results) => {
      if (results && results.length) {
        res.send({
          resultsStatus: "info",
          message: `${results.length} comment found`,
          results: results,
        });
      } else {
        res.send({
          resultsStatus: "info",
          message: `0 comment found`,
        });
      }
    })
    .catch((err) => next(err));
});

router.post("/", authentication, function (req, res, next) {
  let loginUserId = req.headers.loginUserId;
  let isAdmin = req.headers.admin;
  let text = req.body.text;
  let post_id = req.body.post_id;
  let creator_id = req.body.creator_id;

  if (!text || !text.length) {
    return res.status(400).send({
      message: "Comment should not be null",
    });
  }
  if (!post_id || !post_id.length) {
    return res.status(400).send({
      message: "post_id should not be null",
    });
  }
  if (!creator_id || !creator_id.length) {
    return res.status(400).send({
      message: "creator_id should not be null",
    });
  }

  if (!isAdmin && creator_id != loginUserId) {
    return res
      .status(401)
      .send({ message: "Yon have no privilege to create this comment." });
  }

  return CommentModel.create(text, post_id, creator_id)
    .then((results) => {
      if (results && results.affectedRows) {
        res.send({
          id: results.insertId,
          message: `Comment is created`,
        });
      } else {
        res.status(400).send({
          message: `Comment creation failed`,
        });
      }
    })
    .catch((err) => next(err));
});

router.delete("/", authentication, function (req, res, next) {
  let loginUserId = req.headers.loginUserId;
  let isAdmin = req.headers.admin;
  let id = req.body.id;

  if (!id) {
    return res.status(400).send({ message: "id should not be null" });
  }

  CommentModel.search(id, null, null)
    .then((results) => {
      return results[0].creator_id;
    })
    .then((creator_id) => {
      if (!isAdmin && creator_id != loginUserId) {
        return res
          .status(401)
          .send({ message: "Yon have no privilege to delete this comment." });
      }
      return CommentModel.delete(id);
    })
    .then((isCommentDeleted) => {
      if (isCommentDeleted) {
        res.send({
          message: `Comment is deleted`,
        });
      } else {
        res.status(400).send({
          message: `id not found`,
        });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
