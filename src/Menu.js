import React from 'react';
import { Link } from "react-router-dom"
import Healthcheck from "./Healthcheck"

class Menu extends React.Component {

    render() {
        return (
            <div className="menu_box">
                <div className="menu"><Link className="photos" to="/photos"></Link></div>
                <div className="menu"><Link className="photoupload" to="/photos/upload"></Link></div>
                <div className="menu"><Link className="data" to="/data"></Link></div>
                <div className="menu"><Link className="dataupload" to="/data/upload"></Link></div>
                <div id="menu_info"><Healthcheck /></div>
            </div>
        )
    }
}
export default Menu;
