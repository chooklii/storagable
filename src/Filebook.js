import React from 'react';
import axios from "axios"
import IP_ADRESS from "../config.js"
import {folders, settup_current_directory, get_file_ending} from "./helper/bookhelper"

const unwanted_types = ["doc", "docx"]
class Filebook extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            folder: [],
            current_directory: "",
            last_directory: [],
            active: null,
            photos: [],
            loaded: true,
            menu: true,
            nextPhotos: [0,14]
        };
    }
    componentWillMount(){
        axios.get("http://" + IP_ADRESS + ":8000/filefolders",{
            headers: {
              charset: "utf-8"
            }})
        .then((response) => {
            try{
                this.setState({folder: response.data["folders"], photos: response.data["files"]})
            }
            catch {
                alert("Nicht möglich Fotos zu laden")
            }
    })
}

componentDidUpdate(){
    if(this.state.loaded == false){
        var url
        if(this.state.current_directory){
            url = "http://" + IP_ADRESS + ":8000/filefolders?path=" + this.state.current_directory
        }else{
            url = "http://" + IP_ADRESS + ":8000/filefolders"
        }
        axios.get(url, {
            headers: {
              charset: "utf-8"
            }})
        .then((response) => {
            try{
                this.setState({loaded: true, folder: response.data["folders"], photos: response.data["files"]})
            }
            catch {
                alert("Nicht möglich Dateien zu laden")
            }
    })
    }
}

    display_photos(folder, slice_value){
        if(this.state.photos.length > 0){
        if(this.state.photos.length <= 14){
            var image_url = ""
        return this.state.photos.map(function(single){
            const file_ending = get_file_ending(single)
            if(unwanted_types.indexOf(file_ending) <= 0){
                image_url = "http://" + IP_ADRESS + ":8000/Dateien/"+folder+"/"+single
            }else if(folder){
                image_url = "http://" + IP_ADRESS + ":8000/file?path="+folder+"/"+single
            }else{
                image_url = "http://" + IP_ADRESS + ":8000/file?path="+single
            }
            return(
                <div id="photobox">
                    <a id="hyperlink" target="_blank" href={image_url}><div id="onefile">{single}</div></a>
                </div>
            )
        })
    }else{
        return this.state.photos.slice(slice_value[0],slice_value[1]).map(function(single){
            const file_ending = get_file_ending(single)
            if(unwanted_types.indexOf(file_ending) <= 0){
                image_url = "http://" + IP_ADRESS + ":8000/Dateien/"+folder+"/"+single
            }else if(folder){
                image_url = "http://" + IP_ADRESS + ":8000/file?path="+folder+"/"+single
            }else{
                image_url = "http://" + IP_ADRESS + ":8000/file?path="+single
            }
            return(
                <div id="photobox">
                    <a id="hyperlink" target="_blank" href={image_url}><div id="onefile">{single}</div></a>
                </div>
                )
            })
        }
    }
}

    returnbutton(){
        const last_directory = this.state.last_directory
        const new_last_directory = this.state.last_directory.slice(1)
        const new_current_directory = this.state.last_directory[0] ? this.state.last_directory[0] : ""
        if(!(last_directory.length == 0 && new_last_directory.length == 0 && this.state.menu)){
            this.setState({
                current_directory: new_current_directory,
                last_directory: new_last_directory,
                photos: [],
                folder: [],
                loaded: false,
                menu: false,
                nextPhotos: [0,14]})
            if(last_directory.length == 0 && new_last_directory.length == 0){
                this.setState({menu: true})
            }
        }else{
            this.props.return_to_menu()
        }
    }

render() {
    return (
        <div id="background">
        <div id="back_button" onClick={() => this.returnbutton()}></div>

        {this.state.active == null &&
        <div id="allfolders">
        {folders((value) => {
            if(this.state.current_directory != ""){
                this.state.last_directory.push(this.state.current_directory)
            }
            this.setState({
            current_directory: settup_current_directory(this.state.last_directory, value),
            loaded: false,
            folder: [],
            photos: [],
            menu: false
                })
            },
            this.state.folder)
        }
        </div>
        }
        <div id="photobook">
            {this.display_photos(
                this.state.current_directory,
                this.state.nextPhotos)}
            {this.state.photos.length > 14 &&
            <div id="loadButtons">
                {this.state.nextPhotos[0] != 0 &&
                <div id="loadLess" onClick={() => this.setState({nextPhotos: [this.state.nextPhotos[0] -14, this.state.nextPhotos[1]-14]})}>
                    Zurück
                </div>
                }
                {this.state.nextPhotos[1] < this.state.photos.length &&
                <div id="loadMore" onClick={() => this.setState({nextPhotos: [this.state.nextPhotos[0] +14, this.state.nextPhotos[1]+14]})}>
                    Nächste
                </div>
                }
            </div>
            }
        </div>
        </div>
    )
}
}
export default Filebook;