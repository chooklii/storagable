const multer = require('multer');
const path = require('path');
const helper = require("./functions/helper")

module.exports = function(app){

    const FileStorage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, path.join(__dirname, '../../usb/NeueDateien'));
        },
        filename: function(req, file, callback) {
            callback(null, helper.format_date() + "_" + file.originalname);
        }
      });

      const fileupload = multer({storage: FileStorage}).array("files[]")


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