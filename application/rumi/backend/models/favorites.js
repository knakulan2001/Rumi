var db = require("../conf/database");
const FavoriteModel = {};

FavoriteModel.search = (id, post_id, saved_by) => {
  parameters = [];

  let baseSQL = `SELECT MAX(f.id) as id, 
                        post_id, 
                        MAX(f.saved_by) as saved_by, 
                        MAX(f.unsaved) as unsaved, 
                        ANY_VALUE(u.username) as username,
                        MAX(f.saved_date) as saved_date
                FROM favorite f  
                JOIN user u 
                ON f.saved_by = u.id
                WHERE f.unsaved = 0 and u.deleted = 0 and u.activated = 1 `;

  if (id) {
    baseSQL += ` AND f.id = ? `;
    parameters.push(id);
  }
  if (post_id) {
    baseSQL += ` AND post_id = ? `;
    parameters.push(post_id);
  }
  if (saved_by) {
    baseSQL += ` AND saved_by = ? `;
    parameters.push(saved_by);
  }

  baseSQL += `GROUP BY f.post_id 
              ORDER BY saved_date ASC `;

  return db
    .execute(baseSQL, parameters)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

FavoriteModel.create = (post_id, saved_by) => {
  let baseSQL = `INSERT INTO favorite 
    (post_id, saved_by, unsaved) 
    VALUES 
    (?,?,0);`;

  return db
    .execute(baseSQL, [post_id, saved_by])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

FavoriteModel.delete = (post_id) => {
  let baseSQL = `UPDATE favorite SET unsaved = 1 WHERE post_id = ?;`;
  return db
    .execute(baseSQL, [post_id])
    .then(([results, fields]) => {
      return Promise.resolve(results && results.affectedRows);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = FavoriteModel;
