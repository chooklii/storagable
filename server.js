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

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.name != "NeueDateien")
    .map(dirent => dirent.name)

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

app.get("/folders", function(req, res){
  res.send(getDirectories(path.join(__dirname, '../usb/')))
})

app.get("/photonames", function(req, res){
  const photosList = []
  const folder = path.join(__dirname, '../usb/' + req.query.folder)
  fs.readdir(folder, function(err, files){
    if(err){
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
  const file = path.join(__dirname, '../usb/' + req.query.path)
  fs.readFile(file, function(err, data){
    if(err){
      res.sendStatus(400)
    }else{
      res.write(data)
      res.end()
    }
  })
})

app.get("/healthcheck", function(req, res){
  if(fs.existsSync(path.join(__dirname, '../usb/NeueFotos'))){
    res.sendStatus(200)
  }else{
    res.sendStatus(204)
  }
})

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.listen(PORT, () => {console.log('Running at ' + PORT )});