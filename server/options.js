const { transformFileAsync } = require("@babel/core");
const fs = require("fs")
const path = require('path');
const helper = require("./helper");
const config = require("./config")

const path_to_dir = config.PATH_TO_DIR


// handles the requests for file and folder options from FE
// takes path to folder as parameter, if not gives out Base
module.exports = function (app) {

  app.get("/options", function (req, res) {
    const req_path = helper.settupRequestPath(req.query.path, path_to_dir)
    const prev_path = settup_prev_path(req.query.path)
    const { files, dirs } = get_files_and_dirs(req_path)
    results = {
      "files": files,
      "folders": dirs,
      "previousPath": prev_path,
      "currentPath": req.query.path
    }
    res.set({
      'content-type': 'application/json; charset=utf-8'
    });
    res.send(results)
  })

  function fix_name(names, pfad) {
    var changed_file = false
    // go through all given directories and photos
    names.map(singleFile => {
      // check if name needs to be changed
      const newName = helper.settupName(singleFile)
      if (newName != singleFile) {
        changed_file = true
        // if so rename the file
        fs.rename(pfad + singleFile, pfad + newName, (err) => {
          if (err) {
            throw err;
          }
        })
      }
    })
    // return true / false depending on if function changed a name
    return changed_file
  }

  function get_files(req_path) {
    // filter all files from given path and return them
    return fs.readdirSync(req_path, {
      withFileTypes: true
    })
      .filter(dirent => dirent.isFile())
      .map(dirent => dirent.name)
  }

  function get_dirs(req_path) {
    // filter all dirs from given path and return them
    return fs.readdirSync(req_path, {
      withFileTypes: true
    })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  }

  function get_files_and_dirs(req_path) {
    // return all dirs and fotos from given path
    var files = get_files(req_path)
    const dirs = get_dirs(req_path)
    // if their name needed to be changed reload all options
    if(!config.SHOW_CONFIG_FILES){
      files = files.filter(x => x.charAt(0) != ".")
    }
    if (fix_name(files, req_path) || fix_name(dirs, req_path)) {
      return {
        files: files.map(x => this.settupName(x)),
        dirs: dirs.map(x => this.settupName(x))
      }
      // if not return previously loaded once
    } else {
      return { files, dirs }
    }
  }


  function settup_prev_path(req_path){
    const slash = get_slash_index(req_path)
    return (req_path && slash) ? req_path.substring(0, slash) : ""
  }

  // string is settup like this: xy/test/
  // and we want the xy/
  // go through all indexes of / and return second to last one - if it is not given return last
  function get_slash_index(string){
    const all_indexes = []
    while(string.indexOf("/") != -1){
      all_indexes.push(string.lastIndexOf("/"))
      string = string.substring(0, string.lastIndexOf("/"))
    }
    return all_indexes[0]
  }
}
