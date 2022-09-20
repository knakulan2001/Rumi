var db = require("../conf/database");
const ListModel = {};

ListModel.query = (category) => {
  let baseSQL = `SELECT * FROM list WHERE category = ?`;
  return db
    .execute(baseSQL, [category])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = ListModel;
