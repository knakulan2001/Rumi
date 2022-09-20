var express = require("express");
var router = express.Router();
var sharp = require("sharp");
var multer = require("multer");
var crypto = require("crypto");
var UserModel = require("../models/users");
var bcrypt = require("bcrypt");
const { json } = require("express");
var UserError = require("../helpers/error/UserError");
var jwt = require("jsonwebtoken");
const { authentication } = require("../middleware/authetication");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    let fileExt = file.mimetype.split("/")[1];
    let randomName = crypto.randomBytes(22).toString("hex");
    cb(null, `${randomName}.${fileExt}`);
  },
});

var uploader = multer({ storage: storage });

router.get("/", function (req, res, next) {
  let id = req.query.id;
  if (id) {
    UserModel.getById(id)
      .then((results) => {
        if (results && results.length) {
          res.send({
            resultsStatus: "info",
            message: `${results.length} result found`,
            results: results,
          });
        } else {
          res.send({
            resultsStatus: "info",
            message: `Cannot find any user by id ${id}`,
          });
        }
      })
      .catch((err) => next(err));
    return;
  }

  let searchTerm = req.query.search;
  let major = req.query.major;
  let school = req.query.school;
  let pet = req.query.pet;
  let smoker = req.query.smoker;
  let gender = req.query.gender;
  let page = req.query.page;
  let size = req.query.size;
  let photo = req.query.photo;
  let thumbnail = req.query.thumbnail;

  UserModel.search(
    searchTerm,
    major,
    school,
    pet,
    smoker,
    gender,
    page,
    size,
    photo,
    thumbnail
  )
    .then((results) => {
      if (results && results.length) {
        res.send({
          resultsStatus: "info",
          message: `${results.length} result found`,
          results: results,
        });
      } else {
        res.send({
          resultsStatus: "info",
          message: `Cannot find any user`,
        });
      }
    })
    .catch((err) => next(err));
});

router.post(
  "/registration",
  uploader.single("photo"),
  function (req, res, next) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let description = req.body.description;
    let gender = req.body.gender;
    let school = req.body.school;
    let major = req.body.major;
    let smoker = req.body.smoker;
    let pets = req.body.pets;

    if (!req.file) {
      return res.status(400).send({ message: "Photo should not be null" });
    }

    let photo = req.file.path;
    let photoName = req.file.filename;
    let thumbnail = `thumbnail-${photoName}`;
    let destinationOfThumbnail = req.file.destination + "/" + thumbnail;

    if (!username || !username.length) {
      return res.status(400).send({ message: "username should not be null" });
    }
    if (!email || !email.length) {
      return res.status(400).send({ message: "email should not be null" });
    }
    if (!password || !password.length) {
      return res.status(400).send({ message: "password should not be null" });
    }
    if (!photo || !photo.length) {
      return res.status(400).send({ message: "Photo should not be null" });
    }
    if (!description || !description.length) {
      return res
        .status(400)
        .send({ message: "Description should not be null" });
    }
    if (!gender || !gender.length) {
      return res.status(400).send({ message: "gender should not be null" });
    }
    if (!school || !school.length) {
      return res.status(400).send({ message: "school should not be null" });
    }
    if (!major || !major.length) {
      return res.status(400).send({ message: "major should not be null" });
    }
    if (!smoker || !smoker.length) {
      return res.status(400).send({ message: "smoker should not be null" });
    }
    if (!pets || !pets.length) {
      return res.status(400).send({ message: "pets should not be null" });
    }

    let emailRegex =
      "^w{1,63}@[a-zA-Z0-9]{2,63}.[a-zA-Z]{2,63}(.[a-zA-Z]{2,63})?$";
    var eight = password.length >= 8;
    var upper = /^[A-Z].*/.test(password);
    var number = /.*\d.*/.test(password);
    var special = /.*[/*\-+!@#$^&].*/.test(password);

    if (
      username == null ||
      !/^[a-zA-Z].*/.test(username) ||
      username.length < 3
    ) {
      next("invalid username");
    } else if (
      !/^\w{1,63}@[a-zA-Z0-9]{2,63}\.[a-zA-Z]{2,63}(\.[a-zA-Z]{2,63})?$/.test(
        email
      )
    ) {
      next("invalid email");
    }

    UserModel.usernameExists(username)
      .then((usernameExists) => {
        if (usernameExists) {
          throw new UserError("username exists", 400);
        } else {
          return UserModel.emailExists(email);
        }
      })
      .then((emailExists) => {
        if (emailExists) {
          throw new UserError("email exists", 400);
        } else
          sharp(photo)
            .resize(200)
            .toFile(destinationOfThumbnail)
            .then(() => {
              return UserModel.create(
                username,
                password,
                email,
                description,
                gender,
                school,
                major,
                smoker,
                pets,
                photoName,
                thumbnail
              );
            });
      })
      .then((createdUserId) => {
        if (createdUserId < 0) {
          res.status(500).send("Internal server error1");
        } else {
          return res.send({
            message: "registration succeeded!",
          });
        }
      })
      .catch((err) => {
        if (err instanceof UserError) {
          res.status(400).send(err.getMessage());
        } else {
          next(err);
        }
      });
  }
);

router.post("/login", function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  UserModel.authenticate(username, password)
    .then((result) => {
      if (result.id > 0) {
        console.log(`User ${username} is logged in`);
        req.session.username = username;
        req.session.userId = result.id;
        res.locals.logged = true;

        let payload = {
          userId: result.id,
          username: username,
        };

        let token = jwt.sign(
          { payload, exp: Math.floor(Date.now() / 1000) + 60 * 15 },
          "my_secret_key"
        );

        res.cookie("token", token, { sameSite: "none", secure: true });
        res.cookie("loggedUserid", result.id, {
          sameSite: "none",
          secure: true,
        });
        res.cookie("username", username, { sameSite: "none", secure: true });
        res.cookie("logged", true, { sameSite: "none", secure: true });
        if (1 == result.admin) {
          res.cookie("admin", true, { sameSite: "none", secure: true });
        }
        res.send({
          message: `${username} is logged in`,
          result: result,
        });
      } else {
        throw new UserError("invalid username/password", 400);
      }
    })
    .catch((err) => {
      // console.log(err);
      next(err);
    });
});

router.patch("/user/:id", function (req, res, next) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let description = req.body.description;
  let gender = req.body.gender;
  let school = req.body.school;
  let major = req.body.major;
  let smoker = req.body.smoker;
  let pets = req.body.pets;
  const changes = req.body;

  const original = retrieveOriginal(
    username,
    email,
    password,
    description,
    gender,
    school,
    major,
    smoker,
    pets
  );
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("session could not be destroyed");
      next(err);
    } else {
      console.log("session was destroyed");
      res.clearCookie("csid");
      res.clearCookie("username");
      res.clearCookie("logged");
      res.clearCookie("admin");
      res.clearCookie("token");
      res.json({ status: "ok", message: "user is logged out." });
    }
  });
});

router.delete("/", authentication, function (req, res, next) {
  let loginUserId = req.headers.loginUserId;
  let isAdmin = req.headers.admin;

  let id = req.body.id;

  if (!id) {
    return res.status(400).send({ message: "ID should not be null" });
  }

  if (!isAdmin && id != loginUserId) {
    return res
      .status(401)
      .send({ message: "Yon have no privilege to delete this user." });
  }

  UserModel.delete(id)
    .then((isUserDeleted) => {
      if (isUserDeleted) {
        res.send({ message: `User is deleted` });
      } else {
        res.status(400).send({
          message: `id not found`,
        });
      }
    })
    .catch((err) => next(err));
});
router.post("/update", function (req, res, next) {
  let description = req.body.description;
  let gender = req.body.gender;
  let school = req.body.school;
  let major = req.body.major;
  let smoker = req.body.smoker;
  let pets = req.body.pets;
  let originalUsername = req.body.originalUsername;

  if (
    description == "" &&
    gender == "" &&
    school == "" &&
    major == "" &&
    smoker == "" &&
    pets == ""
  ) {
    res.send({ message: "Nothing updated" });
  } else {
    UserModel.changeData(
      description,
      gender,
      school,
      major,
      smoker,
      pets,
      originalUsername
    )
      .then((results) => {
        console.log(results)
        res.send({ message: results });
      })
      .catch((err) => next(err));
  }
});

module.exports = router;
