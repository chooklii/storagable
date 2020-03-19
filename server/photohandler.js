const multer = require('multer');
const path = require('path');
const fs = require("fs")
const helper = require("../functions/helper")

module.exports = function(app){

    const PhotoStorage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, path.join(__dirname, '../../usb/Fotos/NeueFotos'));
        },
        filename: function(req, file, callback) {
            callback(null, helper.format_date() + "_" + file.originalname);
        }
      });
      
    const photoupload = multer({ storage: PhotoStorage}).array("files[]")

    app.get("/photonames", function(req, res){
        const photosList = []
        const folder = path.join(__dirname, '../../usb/Fotos/' + req.query.folder)
        fs.readdir(folder, function(err, files){
          if(err){
            console.log(err)
            res.sendStatus(400)
          }else{
            files.forEach(function (file){
              photosList.push(file)
            })
            res.send(photosList)
          }
        })
      })
      
      app.get("/photo", function(req, res){
        const file = path.join(__dirname, '../../usb/Fotos/' + req.query.path)
        fs.readFile(file, function(err, data){
          if(err){
            res.sendStatus(400)
          }else{
            res.write(data)
            res.end()
          }
        })
      })

      app.post('/photoupload', function(req, res){
        photoupload(req, res, function(err){
          if (err){
            console.log(err)
            res.sendStatus(500)
          }
          else{
          res.sendStatus(201)
          }
        })
      });

}