const cors = require('cors');
const express = require('express');
const multer = require('multer');
const fs = require("fs")
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = 8000;
const helper = require("./functions/helper")


app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors())

const PhotoStorage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, path.join(__dirname, '../usb/NeueFotos'));
  },
  filename: function(req, file, callback) {
      callback(null, helper.format_date() + "_" + file.originalname);
  }
});

const FileStorage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, path.join(__dirname, '../usb/NeueDateien'));
  },
  filename: function(req, file, callback) {
      callback(null, helper.format_date() + "_" + file.originalname);
  }
});

const photoupload = multer({ storage: PhotoStorage}).array("files[]")
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


app.get("/healthcheck", function(req, res){
  if(fs.existsSync(path.join(__dirname, '../usb/NeueFotos'))){
    res.sendStatus(200)
  }else{
    res.sendStatus(204)
  }
})

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.listen(PORT, () => {console.log('Running at ' + PORT )});