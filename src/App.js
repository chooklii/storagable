import React from 'react';
import axios from "axios"
import IP_ADRESS from "./config.js"
import "./App.css"

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state ={
        file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
}
onFormSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    for(var i = 0; i< this.state.file.length; i++){
      formData.append('myImages[]',this.state.file[i]);
    }
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.post("http://" + IP_ADRESS + ":8000/upload",formData,config)
        .then((response) => {
            alert("The file is successfully uploaded");
            this.setState({file: null})
        }).catch((error) => {
          alert(error)
    });
}
onChange(e) {
    this.setState({file:e.target.files});
}

render() {
    return (
      <div id="background">
        <form onSubmit={this.onFormSubmit}>
        <div class="inputWrapper">
            <input class="fileInput" type="file" name="myImages[]" accept="image/*" multiple onChange= {this.onChange} />
        </div>
            <br></br>
            {this.state.file != null &&
            <button id="submit_button" type="submit">UPLOAD</button>
            }
            </form>
        </div>
    )
}
}
export default App;
