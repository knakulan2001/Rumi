var db = require("../conf/database");
const CommentModel = {};

CommentModel.search = (id, creator_id, post_id) => {
  parameters = [];

  let baseSQL = `SELECT c.*, u.username
    FROM comment c  
    JOIN user u 
    ON c.creator_id = u.id
    WHERE c.deleted = 0 and u.deleted = 0 and u.activated = 1 `;

  if (id) {
    baseSQL += ` AND c.id = ? `;
    parameters.push(id);
  }
  if (creator_id) {
    baseSQL += ` AND creator_id = ? `;
    parameters.push(creator_id);
  }
  if (post_id) {
    baseSQL += ` AND post_id = ? `;
    parameters.push(post_id);
  }

  baseSQL += ` ORDER BY created_date ASC `;

  return db
    .execute(baseSQL, parameters)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

CommentModel.create = (text, post_id, creator_id) => {
  let baseSQL = `INSERT INTO comment 
  (text, post_id, creator_id, deleted) 
  VALUES 
  (?,?,?,0);`;
  // should have indentation (by alan)

  return db
    .execute(baseSQL, [text, post_id, creator_id])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

CommentModel.delete = (id) => {
  let baseSQL = `UPDATE comment SET deleted = 1 WHERE id = ?;`;
  return db
    .execute(baseSQL, [id])
    .then(([results, fields]) => {
      return Promise.resolve(results && results.affectedRows);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = CommentModel;
