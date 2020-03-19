import React from 'react';
import PhotoUpload from "./Photoupload";
import Fileupload from './Fileupload';
import Healthcheck from "./Healthcheck"
import Photobook from "./Photobook"
import Filebook from "./Filebook"

class Menu extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            active: null,
            return: false
        };
    }

return_to_menu(){
    this.setState({active: null})
}

render() {
    return (
        <div>
            {!this.state.active &&
            <div className="menu_box">
                <div className="menu" onClick={() => this.setState({active:"1"})}></div>
                <div className="menu" onClick={() => this.setState({active:"2"})}></div>
                <div className="menu" onClick={() => this.setState({active:"3"})}></div>
                <div className="menu" onClick={() => this.setState({active:"4"})}></div>
                <div id="menu_info"><Healthcheck/></div>
            </div>
            }
            {this.state.active == "1" &&
            <Photobook
                return_to_menu = {() => this.return_to_menu()}
            />
            }
            {this.state.active == "2" &&
            <PhotoUpload
                return_to_menu = {() => this.return_to_menu()}
            />
            }
            {this.state.active == "3" &&
            <Filebook
                return_to_menu = {() => this.return_to_menu()}
            />
            }
            {this.state.active == "4" &&
            <Fileupload
                return_to_menu = {() => this.return_to_menu()}
            />
            }
        </div>
    )
}
}
export default Menu;