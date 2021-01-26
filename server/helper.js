const fs = require("fs")
const path = require('path');

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
  }

}