var express = require("express");
const { authentication } = require("../middleware/authetication");
var router = express.Router();
var NotificationModel = require("../models/notifications");
var UserModel = require("../models/users");

router.get("/", authentication, function (req, res, next) {
  let loginUserId = req.headers.loginUserId;
  let isAdmin = req.headers.admin;

  NotificationModel.search(loginUserId)
    .then((results) => {
      if (results && results.length) {
        res.send({
          resultsStatus: "info",
          message: `${results.length} notifications found`,
          results: results,
        });
      } else {
        res.send({
          resultsStatus: "info",
          message: `0 notification found`,
        });
      }
    })
    .catch((err) => next(err));
});

router.post("/trigger", authentication, function (req, res, next) {
  let loginUserId = req.headers.loginUserId;
  let isAdmin = req.headers.admin;
  let text = req.body.text;

  if (!isAdmin) {
    return res
      .status(401)
      .send({ message: "Yon have no privilege to trigger notification." });
  }

  if (!text) {
    return res.status(400).send({ message: "text should not be null" });
  }

  UserModel.search(null, null, null, null, null, null, null, null, null, null)
    .then((results) => {
      let success = true;
      if (results) {
        results.forEach((user) => {
          console.log(user.id);
          if (!NotificationModel.create(text, user.id, loginUserId)) {
            success = false;
          }
        });
        if (success) {
          return res
            .status(200)
            .send({ message: "Trigger Notification Succsess!" });
        } else {
          return res.status(500).send({ message: "Intenal Server Error(n52)" });
        }
      } else {
        return res.status(500).send({ message: "Intenal Server Error(n53)" });
      }
    })
    .catch((err) => next(err));
});
router.patch("/readAll", authentication, function (req, res, next) {
  let loginUserId = req.headers.loginUserId;
  let isAdmin = req.headers.admin;

  NotificationModel.readAll(loginUserId)
    .then((results) => {
      res.send({
        resultsStatus: "info",
        results: results,
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
