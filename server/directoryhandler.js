const fs = require("fs")
const path = require('path');

module.exports = function(app){

  const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const getFiles = source =>
    fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name)


  app.get("/photofolders", function(req, res){
    if(req.query.path){
      files = getFiles(path.join(__dirname, '../../usb/Fotos/' + req.query.path))
      folders = getDirectories(path.join(__dirname, '../../usb/Fotos/' + req.query.path))
    }else{
      files = getFiles(path.join(__dirname, '../../usb/Fotos/'))
      folders = getDirectories(path.join(__dirname, '../../usb/Fotos/'))
    }
    results = {"files": files, "folders": folders}
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.send(results)
  })

  app.get("/filefolders", function(req, res){
    if(req.query.path){
      files = getFiles(path.join(__dirname, '../../usb/Dateien/' + req.query.path))
      folders = getDirectories(path.join(__dirname, '../../usb/Dateien/' + req.query.path))
    }else{
      files = getFiles(path.join(__dirname, '../../usb/Dateien/'))
      folders = getDirectories(path.join(__dirname, '../../usb/Dateien/'))
    }
    results = {"files": files, "folders": folders}
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.send(results)
})
}