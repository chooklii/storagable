const cors = require('cors');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = 8000;

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors())

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "./saves");
  },
  filename: function(req, file, callback) {
      callback(null, formate_date() + "_" + file.originalname);
  }
});

function formate_date(){
  const d = new Date()
  return d.getFullYear() + "_" + d.getMonth() + "_" + d.getDate() + "_" + d.getMinutes() + "_" + d.getSeconds()
}

var upload = multer({
  storage: Storage
}).array("files[]")


app.post('/upload', function(req, res){
  upload(req, res, function(err){
    if (err){
      res.sendStatus(500)
    }
    res.sendStatus(201)
  })
});

app.get("/healthcheck", (req, res) => res.end("Express Server up and runnung"))
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () => {
    console.log('Running at ' + PORT );
});