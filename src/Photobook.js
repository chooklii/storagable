import React from 'react';
import axios from "axios"
import { FULL_ROUTE, HTTP_METHOD } from "../config.js"
import { folders, settup_current_directory, get_file_ending } from "./helper/bookhelper"
import ReactPlayer from "react-player"

const unwanted_types = [".mov", ".m4v", ".mp4", ".MOV"]

class Photobook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: [],
            current_directory: "",
            last_directory: [],
            active: null,
            photos: [],
            loaded: true,
            menu: true,
            nextPhotos: [0, 14],
            video_active: false,
            video_link: ""
        };
    }
    componentWillMount() {
        axios.get(FULL_ROUTE + "/photofolders", {
            headers: {
                charset: "utf-8"
            }
        })
            .then((response) => {
                try {
                    this.setState({ folder: response.data["folders"], photos: response.data["files"] })
                }
                catch {
                    alert("Nicht möglich Fotos zu laden")
                }
            })
    }

    componentDidUpdate() {
        if (this.state.loaded == false) {
            var url
            if (this.state.current_directory) {
                url = FULL_ROUTE + "/photofolders?path=" + this.state.current_directory
            } else {
                url = FULL_ROUTE + "/photofolders"
            }
            axios.get(url)
                .then((response) => {
                    try {
                        this.setState({ loaded: true, folder: response.data["folders"], photos: response.data["files"] })
                    }
                    catch {
                        alert("Nicht möglich Fotos zu laden")
                    }
                })
        }
    }

    display_photos(folder, slice_value, show_video) {
        var image_url = ""
        if (this.state.photos.length > 0) {
            if (this.state.photos.length <= 14) {
                return this.state.photos.map(function (single) {
                    const file_ending = get_file_ending(single)
                    image_url = FULL_ROUTE + "/Fotos/" + folder + "/" + single
                    if (unwanted_types.indexOf(file_ending) > 0) {
                        return (
                            <div id="photobox_movie">
                                <div id="onemovie_name">{single}</div>
                                <div onClick={() => show_video(image_url)} id="onemovie_show">Anschauen</div>
                                <a id="hyperlink" target="_blank" href={image_url}><div id="onemovie_download">Download</div></a>
                            </div>
                        )
                    } else {
                        return (
                            <div id="photobox">
                                <img id="onephoto" src={image_url}></img>
                            </div>
                        )
                    }
                })
            } else {
                return this.state.photos.slice(slice_value[0], slice_value[1]).map(function (single) {
                    const file_ending = get_file_ending(single)
                    image_url = FULL_ROUTE + "/Fotos/" + folder + "/" + single
                    if (unwanted_types.indexOf(file_ending) > 0) {
                        return (
                            <div id="photobox_movie">
                                <div id="onemovie_name">{single}</div>
                                <div onClick={() => show_video(image_url)} id="onemovie_show">Anschauen</div>
                                <a id="hyperlink" target="_blank" href={image_url}><div id="onemovie_download">Download</div></a>
                            </div>
                        )
                    } else {
                        return (
                            <div id="photobox">
                                <img id="onephoto" src={image_url}></img>
                            </div>
                        )
                    }
                })
            }
        }
    }

    returnbutton() {
        const last_directory = this.state.last_directory
        const new_last_directory = this.state.last_directory.slice(1)
        const new_current_directory = this.state.last_directory[0] ? this.state.last_directory[0] : ""
        if (!(last_directory.length == 0 && new_last_directory.length == 0 && this.state.menu)) {
            this.setState({
                current_directory: new_current_directory,
                last_directory: new_last_directory,
                photos: [],
                folder: [],
                loaded: false,
                menu: false,
                nextPhotos: [0, 14]
            })
            if (last_directory.length == 0 && new_last_directory.length == 0) {
                this.setState({ menu: true })
            }
        } else {
            window.location.href = HTTP_METHOD + window.location.host
        }
    }

    render() {
        return (
            <div id="background">
                <div id="back_button" onClick={() => this.returnbutton()}></div>

                {this.state.video_active &&
                    <div>
                        <div id="close_button" onClick={() => this.setState({ video_link: "", video_active: false })}></div>
                        <ReactPlayer
                            url={this.state.video_link}
                            playing={true}
                            controls={true}
                            style={{ padding: "100px" }}
                        />
                    </div>
                }
                {!this.state.video_active &&
                    <div>
                        {this.state.active == null &&
                            <div id="allfolders">
                                {folders((value) => {
                                    if (this.state.current_directory != "") {
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
                                this.state.nextPhotos,
                                (video_url) => {
                                    this.setState({ video_link: video_url, video_active: true })
                                }
                            )}
                            {this.state.photos.length > 14 &&
                                <div id="loadButtons">
                                    {this.state.nextPhotos[0] != 0 &&
                                        <div id="loadLess" onClick={() => this.setState({ nextPhotos: [this.state.nextPhotos[0] - 14, this.state.nextPhotos[1] - 14] })}>
                                            Zurück
                </div>
                                    }
                                    {this.state.nextPhotos[1] < this.state.photos.length &&
                                        <div id="loadMore" onClick={() => this.setState({ nextPhotos: [this.state.nextPhotos[0] + 14, this.state.nextPhotos[1] + 14] })}>
                                            Nächste
                </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default Photobook;