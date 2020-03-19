const cors = require('cors');
const express = require('express');
const fs = require("fs")
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = 8000;

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors())

require("./server/photohandler")(app)
require("./server/filehandler")(app)
require("./server/directoryhandler")(app)

app.get("/healthcheck", function(req, res){
  if(fs.existsSync(path.join(__dirname, '../usb/Fotos/NeueFotos'))){
    res.sendStatus(200)
  }else{
    res.sendStatus(204)
  }
})

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.listen(PORT, () => {console.log('Running at ' + PORT )});