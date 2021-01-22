# photoUploader

React FrontEnd and Express BackEnd. FrontEnd build with Webpack and served through Express Server.

Default folder for saves is within usb - Can be changed within server.js

# first time:

1. Create own config.js - Template is given inside src/

2. Run "npm install" to install all dependencies (If not there install needed stuff like node and so on)

# to run:

1. "run npm run build" to put all JS-Files together
-> Not needed, if there are no changes inside of those files

2. "node server.js" to run Server on localhost:8000


<h2>API-Endpoints</h2>

`/options`

Parameter:

?path="PATH_TO_FOLDER"

```
{
files: [1.pdf]
folders: [Private]
}
```


`/upload`

upload files from post body to folder from path

Parameter:

?path="PATH_TO_FOLDER