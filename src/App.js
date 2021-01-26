import React from 'react';
import {Menu} from "./Components"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "../static/style-mobile.css";
import "../static/style-desktop.css";
import "../static/style-tablet.css";
import "../static/style-tablet-large.css";
import "../static/style-general.css";


class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Menu />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
export default App;
