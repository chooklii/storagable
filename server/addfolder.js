const fs = require("fs")
const helper = require("./helper");
const config = require("./config")
const path_to_dir = config.PATH_TO_DIR


// add folder add given path
module.exports = function(app){

    app.post("/folder", function(req, res){
        // settup path
        const req_path = helper.settupRequestPath(req.query.path, path_to_dir)
        create_folder(req_path) ? res.status(201).send() : res.status(409).send()

    })

    function create_folder(req_path){
        // if folder exists return false and given false return 409
        if(!fs.existsSync(req_path)){
            fs.mkdirSync(req_path)
            return true
        }else return false
    }
}