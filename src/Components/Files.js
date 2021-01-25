import React from "react"
import { FULL_ROUTE } from "../config"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileVideo, faFilePdf, faFileWord } from "@fortawesome/free-solid-svg-icons";

const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9)

const image_types = [".jpg", ".jpeg", ".png"]
const movie_types = [".mov", ".m4v", ".mp4"]
const readable_files = [".pdf"]
const download_types = [".doc", ".docx"]
class Files extends React.Component {
    constructor(props){
        super(props)
        this.state={
            files: 20
        }
    }
    renderFiles(files) {
        // check type of the file and depending on it render different component
        return files.map(single => {
            const file_ending = single.toLowerCase().substring(single.lastIndexOf("."), single.length)
            if (image_types.includes(file_ending)) return this.renderImage(single)
            else if (movie_types.includes(file_ending)) return this.renderMovie(single)
            else if (download_types.includes(file_ending)) return this.renderWord(single)
            return this.renderPdf(single)
        })
    }

    // images are going to be displayed on the page
    renderImage(name) {
        return (
            <div key={keyGenerator()} className="files_box image">
                <img className="files_image" src={FULL_ROUTE + this.props.currentPath + "/" + name} />
            </div>
        )

    }

    // movies have a link to another tab where you can watch them
    renderMovie(name) {
        return (
            <div onClick={() => window.open(FULL_ROUTE + this.props.currentPath + "/" + name, "_blank")} key={keyGenerator()} className="files_box">
                <FontAwesomeIcon className="font-icon" icon={faFileVideo} />
                <div className="file_name">{name}</div>
            </div>
        )
    }

    // pdf have a link to another tab where you can read them
    renderPdf(name) {
        return (
            <div key={keyGenerator()} onClick={() => window.open(FULL_ROUTE + this.props.currentPath + "/" + name, "_blank")} className="files_box">
                <FontAwesomeIcon className="font-icon" icon={faFilePdf} />
                <div className="file_name">{name}</div>
            </div>
        )
    }

    // word have a link to another tab where they will be downloaded
    renderWord(name) {
        return (
            <div key={keyGenerator()} onClick={() => window.open(FULL_ROUTE + this.props.currentPath + "/" + name, "_blank")} className="files_box">
                <FontAwesomeIcon className="font-icon" icon={faFileWord} />
                <div className="file_name">{name}</div>
            </div>
        )
    }

    showMorePhotos(){
        const amound_files = this.props.files.length
        const {files} = this.state
        if(files + 20 < amound_files) this.setState({files: files+20})
        else this.setState({files: amound_files})
    }

    render() {
        const amound_photos = this.props.files.filter(x => image_types.includes(x.toLowerCase().substring(x.lastIndexOf("."), x.length))).length
        const amound_files = this.props.files.length
        return (
            <div className="files">
                {amound_photos < 20 && this.renderFiles(this.props.files)}
                {amound_photos > 20 && this.renderFiles(this.props.files.slice(0,this.state.files))}
                {amound_photos > 20 && <button className="button_show_more" onClick={() => this.showMorePhotos()}>Mehr anzeigen</button>}
            </div>

        )
    }
}
export default Files