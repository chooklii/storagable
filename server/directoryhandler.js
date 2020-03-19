const fs = require("fs")
const path = require('path');

module.exports = function(app){

    const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

    app.get("/photofolders", function(req, res){
  res.send(getDirectories(path.join(__dirname, '../../usb/Fotos/')))
})

app.get("/filefolders", function(req, res){
  res.send(getDirectories(path.join(__dirname, '../../usb/Dateien/')))
})

}