# Storagable 

Storagable (Storage + accessable) is an Node-Application which enables you to access all of your hard disc through a Web application e.g. on your phone.

You are also able to upload files and photos from your every device possible and create folders through the Application.

This enables you to quickly backup your photos to your hard desk without having to plug your phone.

## Technology 

Storagable uses an React Front-End with an Express Back-End. The Front-End is build with Webpack and served from the Express-Server.

## Settup

Bevor starting the application create a `config.js` inside of the `server` folder and also inside of the `src` folder. Both come with templates and have following structure

`server/config.js`

```
const PATH_TO_DIR = "../../usb/"

module.exports =  {
    PATH_TO_DIR
}
```

`src/config.js`

```
const IP_ADRESS = "IP_ADRESS"
const PORT = "8000"
const HTTP_METHOD = "http://"
const FULL_ROUTE = HTTP_METHOD + IP_ADRESS + PORT
export default {
    IP_ADRESS,
    PORT,
    HTTP_METHOD,
    FULL_ROUTE
}
```

## Run

If this is your first time running this project make sure to create the config files above. Next run `npm install` to install all dependencies (If you dont have node and stuff installed use tutorials from the internet to do so)

The Command `npm run build` puts all JS/HTML/CSS Files together and creates a new build which going to be served from the Backend. To start the Server run `node server.js` which will start it on localhost:8000

If you want to develop changes inside of the UI run `npm start` which will update on changes inside of the code and enable you to quickly see your changes.


## API-Endpoints

GET `/options`

Parameter:

?path="PATH_TO_FOLDER"

```
{
files: [1.pdf],
folders: [Private],
previousPath: "Path user came from"
currentPath: "Path the navigation at currently"

}
```
___

POST `/upload`

upload files from post body to folder from path

Query-Parameter:

path="PATH_TO_FOLDER

___


POST `/folder`

creates a new folder on given path

Query-Parameter: 

path=PATH_TO_DOR