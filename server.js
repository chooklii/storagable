const cors = require('cors');
const express = require('express');
const fs = require("fs")
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = 8000;

// not beautiful, but we are going to expose all of our storage to our local network
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/Dateien', express.static(path.join(__dirname, '../usb/Dateien')));
app.use('/Fotos', express.static(path.join(__dirname, '../usb/Fotos')));

app.use(bodyParser.json());
app.use(cors())

// import all endpoints
require("./server/upload")(app)
require("./server/options")(app)
require("./server/addfolder")(app)


// add healthcheck - is used to display message if storage is connected
app.get("/healthcheck", function(req, res){
  if(fs.existsSync(path.join(__dirname, '../usb/Fotos/NeueFotos'))){
    res.sendStatus(200)
  }else{
    res.sendStatus(204)
  }
})

app.get('/*', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.listen(PORT, () => {console.log('Running at ' + PORT )});