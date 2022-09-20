var db = require("../conf/database");
const FileModel = {};

FileModel.getFilePath = (name) => {
  return `${__dirname}/../public/upload/` + name;
};

module.exports = FileModel;
