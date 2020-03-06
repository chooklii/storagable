const cors = require('cors');
var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = Express();
app.use(bodyParser.json());
app.use(cors())
const PORT = 8000;

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "./public");
  },
  filename: function(req, file, callback) {
      callback(null, formate_date() + "_" + file.originalname);
  }
});

function formate_date(){
  var d = new Date()
  var month = d.getMonth()
  var day = d.getDate()
  var year = d.getFullYear()
  var minute = d.getMinutes()
  var secound = d.getSeconds()
  const current_date = year + "_" + month + "_" + day + "_" + minute + "_" + secound
  return current_date
}

var upload = multer({
  storage: Storage
}).array("myImages[]")

app.post('/upload', function(req, res){
  upload(req, res, function(err){
    if (err){
      return res.end("ERROR")
    }
    return res.end("ERFOLG")
  })
});

app.get("/", function(req, res){
  res.end("Hallo")
})

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});