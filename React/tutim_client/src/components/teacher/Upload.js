import React, { Component } from 'react';

class Upload extends Component{
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null
          }
      }

    onChangeHandler=event=>{
    this.setState({
        selectedFile: event.target.files[0],
        loaded: 0, 
        })
    }

    onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
    }

    render(){
        return (<form>
            <input type='file' name='file'>

            </input>
            <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
        </form>
        );
    }
}


export default Upload;