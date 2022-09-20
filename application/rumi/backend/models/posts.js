var db = require("../conf/database");
const PostModel = {};

PostModel.search = (
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
) => {
  parameters = [];

  let baseSQL = `SELECT p.*, u.username, (SELECT f.id FROM favorite f WHERE f.post_id = p.id AND f.unsaved = 0 LIMIT 1) AS favorite_id
    FROM post p 
    JOIN user u
    ON p.creator_id = u.id
    WHERE p.deleted = 0 and u.deleted = 0 and u.activated = 1`;

  if (searchTerm) {
    baseSQL += ` AND (p.caption like ? OR p.description like ?) `;
    let sqlReadySearchTerm = "%" + searchTerm + "%";
    parameters.push(sqlReadySearchTerm);
    parameters.push(sqlReadySearchTerm);
  }
  if (location) {
    baseSQL += ` AND ( `;
    for (var i = 0; i < location.length; i++) {
      if (i != 0) {
        baseSQL += ` OR `;
      }
      baseSQL += `p.location = ? `;
      parameters.push(location[i]);
    }

    baseSQL += ` ) `;
  }
  if (pricefrom) {
    baseSQL += ` AND p.price >= ? `;
    parameters.push(pricefrom);
  }
  if (priceto) {
    baseSQL += ` AND p.price <= ? `;
    parameters.push(priceto);
  }
  if (parking) {
    baseSQL += ` AND p.parking = ? `;
    parameters.push(parking);
  }
  if (pet) {
    baseSQL += ` AND p.pet = ? `;
    parameters.push(pet);
  }
  if (smoking) {
    baseSQL += ` AND p.smoking = ? `;
    parameters.push(smoking);
  }
  if (gender) {
    baseSQL += ` AND p.gender = ? `;
    parameters.push(gender);
  }
  if (latitude) {
    baseSQL += ` AND p.latitude = ? `;
    parameters.push(latitude);
  }
  if (longitude) {
    baseSQL += ` AND p.longitude = ? `;
    parameters.push(longitude);
  }
  if (creator_id) {
    baseSQL += ` AND p.creator_id = ? `;
    parameters.push(creator_id);
  }
  if (page && size && size < 200) {
    baseSQL += ` LIMIT ?, ? `;
    parameters.push(page);
    parameters.push(size);
  } else {
    baseSQL += ` LIMIT 100 `;
  }

  return db
    .execute(baseSQL, parameters)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

PostModel.queryById = (id) => {
  let baseSQL = `SELECT p.*, u.username, u.email
    FROM post p  
    JOIN user u 
    ON p.creator_id = u.id 
    WHERE p.id = ?; `;

  return db
    .execute(baseSQL, [id])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

PostModel.create = (
  caption,
  description,
  photo,
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
) => {
  let baseSQL = `INSERT INTO post 
  (caption, description, photo, thumbnail, location, price, parking, pet, smoking, gender, creator_id, deleted, latitude, longitude) 
  VALUES 
  (?,?,?,?,?,?,?,?,?,?,?,0,?,?);`;

  return db
    .execute(baseSQL, [
      caption,
      description,
      photo,
      thumbnail,
      location,
      price,
      parking,
      pet,
      smoking,
      gender,
      creator_id,
      latitude,
      longitude,
    ])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

PostModel.delete = (id) => {
  let baseSQL = `UPDATE post SET deleted = 1 WHERE id = ?;`;
  return db
    .execute(baseSQL, [id])
    .then(([results, fields]) => {
      return Promise.resolve(results && results.affectedRows);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = PostModel;
