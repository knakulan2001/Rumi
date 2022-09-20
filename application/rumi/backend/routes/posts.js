var express = require("express");
var sharp = require("sharp");
var multer = require("multer");
var crypto = require("crypto");
var router = express.Router();
var PostModel = require("../models/posts");
var UserModel = require("../models/users");
var PostError = require("../helpers/error/PostError");
var { authentication } = require("../middleware/authetication");

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
    PostModel.queryById(id)
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
            message: `Cannot find any post by id ${id}`,
          });
        }
      })
      .catch((err) => next(err));
    return;
  }

  let searchTerm = req.query.search;
  let location = req.query.location;
  let pricefrom = req.query.pricefrom;
  let priceto = req.query.priceto;
  let parking = req.query.parking;
  let pet = req.query.pet;
  let smoking = req.query.smoking;
  let gender = req.query.gender;
  let latitude = req.query.latitude;
  let longitude = req.query.longitude;
  let creator_id = req.query.creator_id;
  let page = req.query.page;
  let size = req.query.size;

  if (location) {
    location = location.split(" ");
  }

  PostModel.search(
    searchTerm,
    location,
    pricefrom,
    priceto,
    parking,
    pet,
    smoking,
    gender,
    latitude,
    longitude,
    creator_id,
    page,
    size
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
          message: `0 result found`,
        });
      }
    })
    .catch((err) => next(err));
});

router.get("/suggest", authentication, function (req, res, next) {
  let loginUserId = req.headers.loginUserId;

  UserModel.getById(loginUserId)
    .then((results) => {
      if (results && results.length) {
        console.log(results);
        return PostModel.search(
          null,
          null,
          null,
          null,
          null,
          results[0].pets,
          results[0].smoker,
          results[0].gender,
          null,
          null,
          null,
          null,
          null
        );
      } else {
        return null;
      }
    })
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
          message: `0 result found`,
        });
      }
    })
    .catch((err) => next(err));
});

router.post(
  "/",
  authentication,
  uploader.single("photo"),
  function (req, res, next) {
    let loginUserId = req.headers.loginUserId;
    let isAdmin = req.headers.admin;
    let caption = req.body.caption;
    let description = req.body.description;
    let location = req.body.location;
    let price = req.body.price;
    let parking = req.body.parking;
    let pet = req.body.pet;
    let smoking = req.body.smoking;
    let gender = req.body.gender;
    let creator_id = req.body.creator_id;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    if (!req.file) {
      return res.status(400).send({ message: "Photo should not be null" });
    }

    let photo = req.file.path;
    let photoName = req.file.filename;
    let thumbnail = `thumbnail-${photoName}`;
    let destinationOfThumbnail = req.file.destination + "/" + thumbnail;

    if (!caption || !caption.length) {
      return res.status(400).send({ message: "Caption should not be null" });
    }
    if (!description || !description.length) {
      return res
        .status(400)
        .send({ message: "Description should not be null" });
    }
    if (!latitude || !latitude.length) {
      return res.status(400).send({ message: "Latitude should not be null" });
    }
    if (!longitude || !longitude.length) {
      return res.status(400).send({ message: "Longitude should not be null" });
    }
    if (!location || !location.length) {
      return res.status(400).send({ message: "Location should not be null" });
    }
    if (!price || !price.length) {
      return res.status(400).send({ message: "Price should not be null" });
    }
    if (!creator_id || !creator_id.length) {
      return res.status(400).send({ message: "Creator_id should not be null" });
    }
    if (!photo || !photo.length) {
      return res.status(400).send({ message: "Photo should not be null" });
    }
    if (!parking || !parking.length) {
      return res.status(400).send({ message: "parking should not be null" });
    }
    if (!pet || !pet.length) {
      return res.status(400).send({ message: "pet should not be null" });
    }
    if (!smoking || !smoking.length) {
      return res.status(400).send({ message: "smoking should not be null" });
    }
    if (!gender || !gender.length) {
      return res.status(400).send({ message: "gender should not be null" });
    }

    if (!isAdmin && creator_id != loginUserId) {
      return res
        .status(401)
        .send({ message: "Yon have no privilege to create this post." });
    }

    sharp(photo)
      .resize(200)
      .toFile(destinationOfThumbnail)
      .then(() => {
        return PostModel.create(
          caption,
          description,
          photoName,
          thumbnail,
          location,
          price,
          parking,
          pet,
          smoking,
          gender,
          creator_id,
          latitude,
          longitude
        );
      })
      .then((results) => {
        if (results && results.affectedRows) {
          res.send({
            id: results.insertId,
            message: `Post is created`,
          });
        } else {
          res.status(400).send({
            message: `Failed`,
          });
        }
      })
      .catch((err) => next(err));
  }
);

router.delete("/", authentication, function (req, res, next) {
  let loginUserId = req.headers.loginUserId;
  let isAdmin = req.headers.admin;
  let id = req.body.id;

  if (!id) {
    return res.status(400).send({ message: "ID should not be null" });
  }

  PostModel.queryById(id)
    .then((results) => {
      if (!results.length) {
        return res.status(400).send({
          message: `post not found`,
        });
      }
      return results[0].creator_id;
    })
    .then((creator_id) => {
      if (!isAdmin && creator_id != loginUserId) {
        return res
          .status(401)
          .send({ message: "Yon have no privilege to delete this post." });
      }

      return PostModel.delete(id);
    })
    .then((isPostDeleted) => {
      if (isPostDeleted) {
        return res.send({ message: `Post is deleted` });
      } else {
        return res.status(400).send({
          message: `post not found`,
        });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
