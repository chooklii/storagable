const multer = require('multer');
const path = require('path');
const fs = require("fs")
const helper = require("./helper")
const config = require("./config")

const path_to_dir = config.PATH_TO_DIR


module.exports = function (app) {

  const FileStorage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, helper.settupRequestPath(req.query.path, path_to_dir));
    },
    filename: function (req, file, callback) {
      callback(null, helper.format_date() + "_" + helper.settupName(file.originalname));
    }
  });

  const fileupload = multer({
    storage: FileStorage
  }).array("files[]")


  app.post('/upload', function (req, res) {
    fileupload(req, res, function (err) {
      if (err) {
        res.sendStatus(500)
      } else {
        res.sendStatus(201)
      }
    })
  });
}