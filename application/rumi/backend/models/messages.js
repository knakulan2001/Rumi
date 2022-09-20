var db = require("../conf/database");
const MessageModel = {};

MessageModel.search = (from_id, to_id) => {
  parameters = [];

  let baseSQL = `SELECT *, 
    (SELECT username FROM user WHERE id = from_id) AS from_username,
    (SELECT username FROM user WHERE id = to_id) AS to_username
    FROM message 
    WHERE 1=1 AND from_id = ? and to_id = ?
    ORDER BY created_date ASC `;

  return db
    .execute(baseSQL, [from_id, to_id])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

MessageModel.searchUnread = (to_id) => {
  parameters = [];

  let baseSQL = `SELECT COUNT(from_id) AS unread_num, 
    from_id,
    (SELECT username FROM user WHERE id = from_id) AS from_username
    FROM message 
    WHERE 1=1 AND to_id = ?
    GROUP BY from_id `;

  return db
    .execute(baseSQL, [to_id])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

MessageModel.create = (text, from_id, to_id) => {
  let baseSQL = `INSERT INTO message 
    (text, from_id, to_id, is_read, deleted, creator_id) 
    VALUES 
    (?,?,?,0,0,?); `;

  return db
    .execute(baseSQL, [text, from_id, to_id, from_id])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = MessageModel;
