import React, { Component, Fragment } from "react";
import AvatarEditor from "react-avatar-editor";
import Navbar from "../Navbar/Navbar.js";
import axios from "axios";
import "./Photo.css";
const URL =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/profile/picture"
    : "http://localhost:3090/profile/picture";

class Photo extends Component {
  state = {
    imgsrc: "https://via.placeholder.com/150",
    selectedFile: null,
    image:
      "https://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg",
    width: 150,
    height: 150,
    border: 10,
    color: [255, 255, 255, 0.6],
    scale: 1,
    rotate: 0,
    test: "",
    selectedFile: null
  };

  // handling the zoom , adjust range
  handleRange = event => {
    this.setState({ scale: event.target.value });
  };

  // when file gets seleceted

  handleFile = async event => {
    this.setState(
      {
        image: event.target.files[0],
        selectedFile: event.target.files[0]
      },
      () => {
        console.log(this.state);
      }
    );
  };

  // upload the file
  handleClick = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", "arjunsapkota");
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    // console.log(formData);
    // for (let value of formData.values()) {
    //   console.log("form data :", value);
    // }

    // let response = await fetch(URL, {
    //   method: "POST",
    //   data: formData
    // });
    axios.post(URL, formData).then(res => {
      console.log(res);
    });
    // let data = await response.json();
  };

  // Crop the image
  cropImage = event => {
    event.preventDefault();
    console.log("i am clicked");
    let canvas = "";
    let canvasScaled = "";
    let dataURL = "";
    if (this.editor) {
      canvas = this.editor.getImage();
      canvasScaled = this.editor.getImageScaledToCanvas();
      dataURL = canvas.toDataURL("image/png", 0.2);
      console.log(dataURL);
    }
    this.setState({ test: dataURL });
  };
  setEditorRef = editor => (this.editor = editor);

  fileUploadHandler = event => {
    //ajax call here
  };

  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="loginContainer row shadow">
          <div className="photoBox">
            <div className="BoxHeading">
              <AvatarEditor
                ref={this.setEditorRef}
                image={this.state.image}
                width={this.state.width}
                height={this.state.height}
                border={this.state.border}
                color={this.state.color} // RGBA
                scale={this.state.scale}
                rotate={this.state.rotate}
              />
              <br />
              <input
                name="myImage"
                type="file"
                onChange={this.handleFile}
                className=""
              />
            </div>
            <div className="BoxFooter">
              <span>Adjust zoom</span>
              <br />
              <input
                type="range"
                min="1"
                max="10"
                step="0.2"
                value={this.state.scale}
                onChange={this.handleRange}
                className="m-2"
              />
              <br />
              <button className="btn btn-info m-1" onClick={this.cropImage}>
                Crop Image
              </button>
              <button className="btn btn-info m-1" onClick={this.handleClick}>
                save
              </button>
              <a href="/dash" className="m-1">
                Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Photo;
