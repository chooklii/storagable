const multer = require('multer');
const path = require('path');
const fs = require("fs")
const helper = require("../functions/helper")

module.exports = function(app){

    const FileStorage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, path.join(__dirname, '../../usb/Dateien/NeueDateien'));
        },
        filename: function(req, file, callback) {
            const fileNameWithoutUTFValues = settupName(file.originalname)
            callback(null, helper.format_date() + "_" + file.originalname);
        }
      });
    
    const settupName = (name) => {
        name.replace("ä","a")
        name.replace("ü","u")
        name.replace("ö","o")
        return name
    }

      const fileupload = multer({storage: FileStorage}).array("files[]")

      app.get("/file", function(req, res){
        const file = path.join(__dirname, '../../usb/Dateien/' + req.query.path)
        fs.readFile(file, function(err, data){
          res.set({ 'content-type': 'application/json; charset=utf-8' });
          if(err){
            res.sendStatus(400)
          }else{
            res.write(data)
            res.end()
          }
        })
      })

    app.post('/fileupload', function(req, res){
        fileupload(req, res, function(err){
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
