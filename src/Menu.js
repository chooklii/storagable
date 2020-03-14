import React from 'react';
import PhotoUpload from "./Photoupload";
import Fileupload from './Fileupload';
import Healthcheck from "./Healthcheck"

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
            <div>
                <div id="menu4">
                    <Healthcheck/>
                </div>
                <div id="menu1"></div>
                <div id="menu2" onClick={() => this.setState({active:"2"})}></div>
                <div id="menu3" onClick={() => this.setState({active:"4"})}></div>
            </div>
            }
            {this.state.active == "2" &&
            <PhotoUpload
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