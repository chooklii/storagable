import React, {useState} from 'react';
import axios from "axios"
import IP_ADRESS from "../config.js"

class Photobook extends React.Component{
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

        this.slice_photos = this.slice_photos.bind(this)
    }
    componentWillMount(){
        axios.get("http://" + IP_ADRESS + ":8000/photofolders")
        .then((response) => {
            try{
                this.setState({folder: response.data["folders"], photos: this.slice_photos(response.data["files"])})
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
            url = "http://" + IP_ADRESS + ":8000/photofolders?path=" + this.state.current_directory
        }else{
            url = "http://" + IP_ADRESS + ":8000/photofolders"
        }
        axios.get(url)
        .then((response) => {
            try{
                this.setState({loaded: true, folder: response.data["folders"], photos: this.slice_photos(response.data["files"])})
            }
            catch {
                alert("Nicht möglich Fotos zu laden")
            }
    })
    }
}

    folders(statefunction){
        return this.state.folder.map(function(single){
            return(
                <div id="folderbox">
                <div id="onefolder" onClick={() => statefunction(single)}>
                </div>
                <p id="foldername">{single}</p>
                </div>
            )
        })
        }

    slice_photos(photolist){
        const only_photos_list = []
        for(var i = 0; i < photolist.length; i++){
            const ending = photolist[i].slice(photolist[i].lastIndexOf("."), photolist[i].length)
            if([".mov", ".m4v", ".mp4", ".MOV"].indexOf(ending) <= 0){
                only_photos_list.push(photolist[i])
            }
        }
        return only_photos_list
    }

    display_photos(folder, slice_value){
        if(this.state.photos.length > 0){
        if(this.state.photos.length <= 14){
            var image_url = ""
        return this.state.photos.map(function(single){
            if(folder){
                image_url = "http://" + IP_ADRESS + ":8000/photo?path="+folder+"/"+single
            }else{
                image_url = "http://" + IP_ADRESS + ":8000/photo?path="+single
            }
            return(
                <div id="photobox">
                    <img id="onephoto"src={image_url}></img>
                </div>
            )
        })
    }else{
        return this.state.photos.slice(slice_value[0],slice_value[1]).map(function(single){
            if(folder){
                image_url = "http://" + IP_ADRESS + ":8000/photo?path="+folder+"/"+single
            }else{
                image_url = "http://" + IP_ADRESS + ":8000/photo?path="+single
            }
            return(
                <div id="photobox">
                    <img id="onephoto"src={image_url}></img>
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

    settup_current_directory(last_directory_list, new_folder){
        var value = ""
        for(var i = 0; i <last_directory_list.length; i++){
            if(value != ""){
                value += "/" + last_directory_list[i]
            }else{
                value = last_directory_list[i]
            }
        }
        if(value != ""){
            return value + "/" + new_folder
        }else{
            return new_folder
        }
    }
render() {
    return (
        <div id="background">
        <div id="back_button" onClick={() => this.returnbutton()}></div>

        {this.state.active == null &&
        <div id="allfolders">
        {this.folders((value) => {
            if(this.state.current_directory != ""){
                this.state.last_directory.push(this.state.current_directory)
            }
            this.setState({
            current_directory: this.settup_current_directory(this.state.last_directory, value),
            loaded: false,
            folder: [],
            photos: [],
            menu: false
                })
            })
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
export default Photobook;