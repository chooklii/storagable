const fs = require("fs")
const path = require('path');
const helper = require("./helper");

const path_to_dir = '../../usb/'


// handles the requests for file and folder options from FE
// takes path to folder as parameter, if not gives out Base
module.exports = function (app) {

  app.get("/options", function (req, res) {
    const req_path = settup_req_path(req.query.path, path_to_dir)
    const { files, dirs } = get_files_and_dirs(req_path)
    results = {
      "files": files,
      "folders": dirs
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
    const files = get_files(req_path)
    const dirs = get_dirs(req_path)
    // if their name needed to be changed reload all options
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

  function settup_req_path(req_path, dir_path) {
    // settup path depeding on if req_path is given or not
    return req_path ? path.join(__dirname, dir_path + req_path + "/") : path.join(__dirname, dir_path)

  }
}
