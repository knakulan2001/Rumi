const { NotExtended } = require("http-errors");
var db = require("../conf/database");
var NotificationError = require("../helpers/error/NotificationError");
const NotificationModel = {};

NotificationModel.search = (user_id) => {
  parameters = [];

  let baseSQL = `SELECT *
    FROM notification  
    WHERE deleted = 0 `;

  if (user_id) {
    baseSQL += " AND to_id = ? ";
    parameters.push(user_id);
  }

  baseSQL += ` ORDER BY created_date DESC `;

  return db
    .execute(baseSQL, parameters)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

NotificationModel.create = (text, to_id, from_id) => {
  let baseSQL = `INSERT INTO notification 
     (text, to_id, from_id, deleted,unread) 
     VALUES 
     (?,?,?,0,1);`;
  let Succsess = true;

  db.execute(baseSQL, [text, to_id, from_id])
    .then(([results, fields]) => {
      console.log("RESULTS:", results);
    })
    .catch((err) => {
      console.log("ERROR:", err);
      Succsess = false;
    });

  return Succsess;
};

NotificationModel.readAll = (to_id) => {
  let baseSQL = `UPDATE notification 
     SET unread = 0
     WHERE to_id = ?`;

  return db
    .execute(baseSQL, [to_id])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = NotificationModel;
