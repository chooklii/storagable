const fs = require("fs")
const path = require('path');

module.exports = function(app){

    const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .filter(dirent => dirent.name != "NeueDateien")
    .map(dirent => dirent.name)

    app.get("/folders", function(req, res){
  res.send(getDirectories(path.join(__dirname, '../../usb/')))
})

}