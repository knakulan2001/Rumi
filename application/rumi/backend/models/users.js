var db = require("../conf/database");
const UserModel = {};

UserModel.getById = (id) => {
  let baseSQL = `SELECT * FROM user WHERE id = ?;`;

  return db
    .execute(baseSQL, [id])
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};
UserModel.changeData = (
  description,
  gender,
  school,
  major,
  smoker,
  pets,
  originalUsername
) => {
  let addSQL = [];
  let startSQL = "UPDATE user SET ";
  let endSql = `WHERE username='${originalUsername}';`;

  if (description != "") {
    addSQL.push("description='" + description + "' ");
  }
  if (gender != "") {
    addSQL.push("gender='" + gender + "' ");
  }
  if (school != "") {
    addSQL.push("school='" + school + "' ");
  }
  if (major != "") {
    addSQL.push("major='" + major + "' ");
  }
  if (smoker != "") {
    addSQL.push("smoker='" + smoker + "' ");
  }
  if (pets != "") {
    addSQL.push("pets='" + pets + "' ");
  }
  let finalsql = startSQL;

  finalsql = finalsql + addSQL[0];
  for (i = 1; i < addSQL.length; i++) {
    if (addSQL.length > 1) {
      finalsql = finalsql + ",";
      finalsql = finalsql + addSQL[i];
    }
  }
  finalsql = finalsql + endSql;
  console.log(finalsql);
  return db
    .execute(finalsql)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};
UserModel.search = (
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
) => {
  parameters = [];

  let baseSQL = `SELECT id, username, last_name, first_name, 
    email, phone, description, gender, birthday, school, major,
    smoker, pets, language, interests, hobbies, admin, photo,
    thumbnail
    FROM user 
    WHERE 1=1 and activated = 1 and deleted = 0 `;

  if (searchTerm) {
    baseSQL += ` AND (description like ? OR username like ?) `;
    let sqlReadySearchTerm = "%" + searchTerm + "%";
    parameters.push(sqlReadySearchTerm);
    parameters.push(sqlReadySearchTerm);
  }
  if (major) {
    baseSQL += ` AND major = ? `;
    parameters.push(major);
  }
  if (school) {
    baseSQL += ` AND school like ? `;
    parameters.push("%" + school + "%");
  }
  if (pet) {
    baseSQL += ` AND pets = ? `;
    parameters.push(pet);
  }
  if (smoker) {
    baseSQL += ` AND smoker = ? `;
    parameters.push(smoker);
  }
  if (gender) {
    baseSQL += ` AND gender = ? `;
    parameters.push(gender);
  }
  if (photo) {
    baseSQL += ` AND photo = ? `;
    parameters.push(photo);
  }
  if (thumbnail) {
    baseSQL += ` AND thumbnail = ? `;
    parameters.push(thumbnail);
  }
  if (page && size && size < 200) {
    baseSQL += ` LIMIT ?, ? `;
    parameters.push(page);
    parameters.push(size);
  } else {
    baseSQL += ` LIMIT 20 `;
  }

  return db
    .execute(baseSQL, parameters)
    .then(([results, fields]) => {
      return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};

UserModel.create = (
  username,
  password,
  email,
  description,
  gender,
  school,
  major,
  smoker,
  pets,
  photo,
  thumbnail
) => {
  let baseSQL = `INSERT INTO user (
    username,
    password,
    email,
    description,
    gender,
    school,
    major,
    smoker,
    pets,
    deleted,
    activated,
    photo,
    thumbnail) 
    VALUES 
    (?,?,?,?,?,?,?,?,?,0,1,?,?);`;

  return db
    .execute(baseSQL, [
      username,
      password,
      email,
      description,
      gender,
      school,
      major,
      parseInt(smoker),
      parseInt(pets),
      photo,
      thumbnail,
    ])
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        return Promise.resolve(results.insertId);
      } else {
        return Promise.resolve(-1);
      }
    })
    .catch((err) => Promise.reject(err));
};

UserModel.usernameExists = (username) => {
  return db
    .execute("SELECT * FROM user WHERE username = ?;", [username])
    .then(([results, fields]) => {
      return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
};

UserModel.emailExists = (email) => {
  return db
    .execute("SELECT * FROM user WHERE email = ?;", [email])
    .then(([results, fields]) => {
      return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
};

UserModel.authenticate = (username, password) => {
  let result = {};
  let baseSQL =
    "SELECT id, username, password, admin, email FROM user WHERE username = ?";
  return db
    .execute(baseSQL, [username])
    .then(([results, fields]) => {
      if (results && results.length == 1) {
        result.id = results[0].id;
        result.admin = results[0].admin;
        result.email = results[0].email;
        return password == results[0].password;
      } else {
        return Promise.resolve(-1);
      }
    })
    .then((passwordsMatch) => {
      if (passwordsMatch) {
        return Promise.resolve(result);
      } else {
        return Promise.resolve(-1);
      }
    })
    .catch((err) => Promise.reject(err));
};

UserModel.update = (id) => {
  let baseSQL = `UPDATE user SET(`;

  if (username) {
    baseSQL += `username = ?`;
    parameters.push(username);
  }

  if (password) {
    baseSQL += `password = ?`;
    parameters.push(password);
  }

  if (email) {
    baseSQL += `email = ?`;
    parameters.push(email);
  }

  if (description) {
    baseSQL += `description = ?`;
    parameters.push(description);
  }

  if (gender) {
    baseSQL += `gender = ?`;
    parameters.push(gender);
  }

  if (school) {
    baseSQL += `school = ?`;
    parameters.push(school);
  }

  if (major) {
    baseSQL += `major = ?`;
    parameters.push(major);
  }

  if (smoker) {
    baseSQL += `smoker = ?`;
    parameters.push(smoker);
  }

  if (pets) {
    baseSQL += `pets = ?`;
    parameters.push(pets);
  }
  baseSQL += `WHERE id = ?`;

  return db
    .execute(baseSQL, [id])
    .then(([results, fields]) => {
      return Promise.resolve(results && results.affectedRows);
    })
    .catch((err) => Promise.reject(err));
};

UserModel.delete = (id) => {
  let baseSQL = `UPDATE user SET deleted = 1 WHERE id = ?;`;
  return db
    .execute(baseSQL, [id])
    .then(([results, fields]) => {
      return Promise.resolve(results && results.affectedRows);
    })
    .catch((err) => Promise.reject(err));
};

module.exports = UserModel;
