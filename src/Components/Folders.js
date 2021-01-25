import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9)
class Folders extends React.Component{

    renderFolder(){
        // go through all folders and display them
        return this.props.folder.map(single => {
            return(
                <div key={keyGenerator()} onClick={() => this.props.loadOptions(single)} className="singleFolder">
                    <FontAwesomeIcon className="font-icon" icon={faFolder} />
                    <div className="folder-name">{single}</div>
                </div>
            )
        })
    }

    render(){
        return(
            <div className="folders">
                {this.renderFolder()}
            </div>
        )
    }
}

export default Folders