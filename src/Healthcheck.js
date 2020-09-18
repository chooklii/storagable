import React from 'react';
import axios from "axios"
import {FULL_ROUTE} from "../config.js"

class Healthcheck extends React.Component{

  constructor(props) {
    super(props);
    this.state ={
        status: null,
    };
  }

  componentWillMount(){
        axios.get(FULL_ROUTE + "/healthcheck")
        .then((response) => {
            if(response.status == 200){
                this.setState({status: "active"})
            }else{
                this.setState({status: "not active"})
            }
        }).catch((error) => {
          alert(error)
    });
    }

render() {
    return (
        <div id="box_status">
            {this.state.status == "active" &&

            <h2 id="status_ok">USB Speicher verfügbar</h2>
            }
            {this.state.status == "not active" &&
            <h2 id="status_nook">USB Speicher nicht verfügbar</h2>
            }
        </div>
    )
}
}
export default Healthcheck;