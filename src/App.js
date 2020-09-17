import React from 'react';
import Menu from "./Menu"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import PhotoUpload from "./Photoupload";
import Fileupload from './Fileupload';
import Photobook from "./Photobook"
import Filebook from "./Filebook"

class App extends React.Component{

render() {
    return (
        <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/">
                    <Menu/>
                </Route>
                <Route exact path="/photos/upload">
                    <PhotoUpload/>
                </Route>
                <Route exact path="/data/upload">
                    <Fileupload/>
                </Route>
                <Route exact path="/photos">
                    <Photobook/>
                </Route>
                <Route exact path="/data">
                    <Filebook/>
                </Route>
            </Switch>
        </div>
        </BrowserRouter>
    )
}
}
export default App;
