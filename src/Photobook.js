import React, {useState} from 'react';
import axios from "axios"
import IP_ADRESS from "../config.js"

class Photobook extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            folder: [],
            active: null,
            photos: [],
            loaded: true,
            nextPhotos: [0,14]
        };

        this.slice_photos = this.slice_photos.bind(this)
    }
    componentWillMount(){
        axios.get("http://" + IP_ADRESS + ":8000/folders")
        .then((response) => {
            try{
                this.setState({folder: response.data})
            }
            catch {
                alert("Nicht möglich Fotos zu laden")
            }
    })
}

componentDidUpdate(){
    if(this.state.active != null && this.state.photos.length == 0 && this.state.loaded == false){
        axios.get("http://" + IP_ADRESS + ":8000/photonames?folder=" + this.state.active)
        .then((response) => {
                this.setState({photos: this.slice_photos(response.data), loaded: true})
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
            const ending = photolist[i].slice(photolist[i].indexOf("."), photolist[i].length)
            if([".mov", ".m4v", ".mp4"].indexOf(ending) <= 0){
                only_photos_list.push(photolist[i])
            }
        }
        return only_photos_list
    }

    display_photos(folder, slice_value){
        if(this.state.photos.length > 0){
        if(this.state.photos.length <= 14){
        return this.state.photos.map(function(single){
            const image_url = "http://" + IP_ADRESS + ":8000/photo?path="+folder+"/"+single
            return(
                <div id="photobox">
                    <img id="onephoto"src={image_url}></img>
                </div>
            )
        })
    }else{
        return this.state.photos.slice(slice_value[0],slice_value[1]).map(function(single){
            const image_url = "http://" + IP_ADRESS + ":8000/photo?path="+folder+"/"+single
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
        if(this.state.active != null){
            this.setState({active: null, photos: [], nextPhotos: [0,14]})
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
        {this.folders((value) => this.setState({active: value, loaded: false}))}
        </div>
        }
        {this.state.active != null &&
        <div id="photobook">
            {this.display_photos(
                this.state.active, 
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
        }
        </div>
    )
}
}
export default Photobook;