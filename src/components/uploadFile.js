import React, { Component } from "react";
import axios from 'axios';
class uploadFile extends Component{
  
       constructor(props){
         super(props);
         this.state= {
          selectedFile: null
        }
       }
    
       onChangeHandler=event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
        console.log(event.target.files[0])
      }
      onClickHandler = () => {
        const data = new FormData() 
        const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
        }
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:8080/upload", data,config, { 
          // receive two parameter endpoint url ,form data 
            })
        .then(res => { // then print response status
        console.log(res)
      })
      }
      render(){
        return(
              <div className="form-group files">
              <label>imgURL:</label>
                        <input type="file" className="custom-file-input" id="customFile" name="imgURL" onChange={this.onChangeHandler}></input>
                        <label className="custom-file-label" for="customFile">Choose file</label>
              </div>
        
        )
      }
    } 
    
    
    export default uploadFile;
    
