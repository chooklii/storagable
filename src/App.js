import React from 'react';
import './App.css';
import Dropzone from "react-dropzone";
import axios from 'axios';

class App extends React.Component{

saveFile(files){
    axios.post("http://localhost:8000/upload", files, { 
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  .then(res => {
    this.setState({data: "Successfull"})
  })
}

render(){
  return (
    <div className="App">
      <header className="App-header">
      <Dropzone onDrop={acceptedFiles => this.saveFile(acceptedFiles)}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone>
      </header>
    </div>
  );
}

}
export default App;
