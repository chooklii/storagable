import React from 'react';
import axios from "axios"
import {FULL_ROUTE} from "../config"
import Header from "./Header"
import Folders from "./Folders"
import Files from "./Files"

class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPath: "",
            prevPath: "",
            folder: [],
            files: []
        }
    }

    componentDidMount(){
        // on load load default options
        this.loadOptions("")
    }

    loadPreviusOptions(){
        this.loadOptions(this.state.prevPath)
    }

    loadOptions(path){
        // load options for given path and add update state
        axios.get(FULL_ROUTE + `/options?path=${path}`, {
            headers: {
                charset: "utf-8"
            }
        }).then((response) => {
            this.setState({
                folder: response.data.folders,
                files: response.data.files,
                currentPath: response.data.currentPath,
                prevPath: response.data.previousPath
            })
        }).catch(error => {
            console.log(error)
            alert("Nicht möglich Daten zu laden")
        })
    }



    render() {
        const {folder, files, currentPath, prevPath} = this.state
        return (
            <div className="menu_box">
                <Header
                prevPath={prevPath}
                currentPath={currentPath}
                loadPreviusOptions={() => this.loadPreviusOptions()}
                loadCurrentOptions={() => this.loadOptions(currentPath)}
                />
                <div className="content">
                <Folders
                folder={folder}
                loadOptions={(foldername) => this.loadOptions(currentPath + "/" + foldername)}/>
                <Files
                currentPath={currentPath}
                files={files}/>
                </div>
            </div>
        )
    }
}
export default Menu;
