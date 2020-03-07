const cors = require('cors');
const Express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = Express();
const PORT = 8000;

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
      return res.end(err)
    }
    return res.end("Upload erfolgreich!")
  })
});

app.get("/", function(req, res){
  res.end("Express Server up and runnung")
})

app.get("/test", function(req, res){
  res.render("./dist/index.html")
})

app.listen(PORT, () => {
    console.log('Running at ' + PORT );
});