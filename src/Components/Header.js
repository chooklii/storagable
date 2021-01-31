import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faFolderPlus, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import {FULL_ROUTE} from "../config"
import axios from "axios";
// Header used to display back, create folder and upload file option
// takes prevPath and currentPath as parameter from props
class Header extends React.Component {
    constructor(props){
        super(props);
        this.state={
            folder: false,
            upload: false,
            files: [],
            uploadSuccess: false
        }

        this.handleUploadedFiles = this.handleUploadedFiles.bind(this);
    }

    // icon to navigate back to last page
    // if their is no last page dont render it
    renderBackIcon(currentPath) {
        if (currentPath) {
            return (
                <div onClick={() => this.props.loadPreviusOptions()} className="header-button back">
                    <FontAwesomeIcon className="font-icon" icon={faArrowCircleLeft} />
                </div>)
        } else {
            return (
                <div className="header-button back">
                </div>
            )
        }
    }

    // function called to create a folder at current directory
    createFolder(currentPath){
        const folderName = this.folderName.value
        axios.post(FULL_ROUTE + `/folder?path=${currentPath + "/" + folderName}`, {
            headers: {
                charset: "utf-8"
            }
        }).then((response) => {
            this.folderName.value = ""
            this.props.loadCurrentOptions()
        }).catch(error => {
            console.log(error)
            if(error.response.status === 409){
                alert("Ordner mit diesem Namen bereits vorhanden")
            }else{
                alert("Nicht möglich Ordner zu erstellen")
            }
        })
    }

    // upload files to current directory
    uploadFiles(currentPath){
        const {files} = this.state
        const formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }
        axios.post(FULL_ROUTE + `/upload?path=${currentPath}`,formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        }).then((response) => {
            this.setState({files: null, uploadSuccess: true})
            this.props.loadCurrentOptions()
        }).catch((error) => {
            console.log(error)
            alert("Fehler beim Upload")
        })
    }

    // used to handle display of folder "popup"
    displayFolder(){
        this.setState({folder: !this.state.folder, upload: false})
    }

    // used to handle display of upload "popup"
    displayUpload(){
        this.setState({upload: !this.state.upload, folder: false, uploadSuccess: false})
    }

    // Create Folder Form
    displayFolderNameForm(){
        return(
            <div className="folder-name-box">
                <input className="folder-form-input" ref={(input) => this.folderName = input}/>
                <button className="button-submit" onClick={() => this.createFolder(this.props.currentPath)}>Ordner erstellen</button>
            </div>

        )
    }

    // add currently uploaded files to state to upload them later on
    handleUploadedFiles(e){
        this.setState({files: e.target.files, uploadSuccess: false})
    }

    // form to upload files
    displayUploadForm(){
        return(
            <div className="folder-name-box">
                <input className="upload-file input" multiple type="file" name="files[]" onChange={this.handleUploadedFiles}/>
                <div className="upload-file text">Datei auswählen</div>
                <button className="button-submit upload" onClick={() => this.uploadFiles(this.props.currentPath)}>Upload</button>
                {this.state.uploadSuccess && <div className="upload-success">Upload erfolgreich!</div>}
            </div>

        )
    }

    render() {
        const { prevPath, currentPath } = this.props
        const {folder, upload, uploadSuccess} = this.state
        return (
            <div>
            <div className="header">
                {this.renderBackIcon(currentPath)}

                <div onClick={() => this.displayFolder()} className="header-button folder">
                    <FontAwesomeIcon className="font-icon" icon={faFolderPlus} />
                </div>

                <div onClick={() => this.displayUpload()} className="header-button upload">
                    <FontAwesomeIcon className="font-icon" icon={faFileUpload} />
                </div>

            </div>
            {folder && this.displayFolderNameForm()}
            {upload && this.displayUploadForm()}
            </div>
        )
    }
}

export default Header