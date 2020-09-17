import React from 'react';
import axios from "axios"
import IP_ADRESS from "../config.js"

class Photoupload extends React.Component{

  constructor(props) {
    super(props);
    this.state ={
        file: null,
        success: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
}
onFormSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    for(var i = 0; i< this.state.file.length; i++){
      formData.append('files[]',this.state.file[i]);
    }
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.post("http://" + IP_ADRESS + ":8000/photoupload",formData,config)
        .then(() => {
            this.setState({success: true})
            this.setState({file: null})
        }).catch((error) => {
        this.setState({success: true})
          alert(error)
    });
}
onChange(e) {
    this.setState({success: false})
    this.setState({file:e.target.files});
}

render() {
    return (
        <div id="background">
        <div id="back_button" onClick={() => window.location.href = "http://" + window.location.host}></div>
        <div id="background_center">
        <form onSubmit={this.onFormSubmit}>
            {this.state.success &&
            <p id="success">ERFOLGREICH!</p>
            }
        <div class="inputWrapper">
            <input class="fileInput" type="file" name="files[]" multiple onChange= {this.onChange} />
        </div>
            <br></br>
            {this.state.file != null &&
            <button id="submit_button" type="submit">UPLOAD</button>
            }
            </form>
        </div>
        </div>
    )
}
}
export default Photoupload;