const authentication = {};
const jwt_decode = require("jwt-decode");
var UserModel = require("../models/users");

authentication.authentication = function (req, res, next) {
  let token;
  let cookies = req.headers.cookie;
  if (!cookies || cookies.indexOf("token") == -1) {
    res.send(401).send("Authentication failed, please login or contact admin.");
    return;
  }

  token = cookies
    .split(";")
    .find((cookie) => {
      return cookie.indexOf("token") >= 0;
    })
    .substring(6);

  let userId = jwt_decode(token).payload.userId;
  req.headers.loginUserId = userId;

  UserModel.getById(userId)
    .then((results) => {
      if (results && results[0].admin) {
        req.headers.admin = 1;
      }
      next();
    })
    .catch((err) => next(err));
};

module.exports = authentication;
