const fs = require("fs")
const path = require('path');
const config = require("./config")
const ftp = require("basic-ftp")

module.exports = {

    settupName: function (name) {
        return name.replace("ä", "ae").replace("ü", "ue").replace("ö", "oe").replace("ß", "ss").replace("@", "(at)".replace("?","_"))
    },

    format_date: function () {
        const d = new Date()
        let month = d.getMonth() + 1
        return d.getFullYear() + "_" + month + "_" + d.getDate() + "_" + d.getMinutes() + "_" + d.getSeconds()
    },

    settupRequestPath: function(req_path, dir_path){
        // settup path depeding on if req_path is given or not
        return req_path ? path.join(__dirname, dir_path + req_path + "/") : path.join(__dirname, dir_path)
  },

  ftp_mkfile: async function(req, path){
    const folderpath = this.settupRequestPath(path, config.PATH_TO_DIR)
    const client = new ftp.Client()
    client.ftp.verbose = false
    try{
        await client.access({
            host: config.FTP_HOST,
            user: config.FTP_USER,
            password: config.FTP_PASSWORD,
        })
        await client.ensureDir(config.FTP_BASE_PATH + path)
        await client.uploadFromDir(folderpath)
        console.log("success")
    }
    catch(err){
        console.log(err)
    }
    client.close()
  }

}