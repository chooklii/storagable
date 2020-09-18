const multer = require('multer');
const path = require('path');
const fs = require("fs")
const helper = require("./helper")

module.exports = function (app) {

  const PhotoStorage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.join(__dirname, '../../usb/Fotos/NeueFotos'));
    },
    filename: function (req, file, callback) {
      const nameWithoutUTF = helper.settupName(file.originalname)
      callback(null, helper.format_date() + "_" + nameWithoutUTF);
    }
  });

  const photoupload = multer({
    storage: PhotoStorage
  }).array("files[]")


  app.get("/photo", function (req, res) {
    const file = path.join(__dirname, '../../usb/Fotos/' + req.query.path)
    fs.readFile(file, function (err, data) {
      res.set({
        'content-type': 'application/json; charset=utf-8'
      });
      if (err) {
        res.sendStatus(400)
      } else {
        res.write(data)
        res.end()
      }
    })
  })

  app.post('/photoupload', function (req, res) {
    photoupload(req, res, function (err) {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else {
        res.sendStatus(201)
      }
    })
  });

}