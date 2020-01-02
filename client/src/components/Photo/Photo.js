import React, { Component, Fragment } from "react";

import Navbar from "../Navbar/Navbar.js";
import axios from "axios";
import "./Photo.css";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/profile/picture"
    : "http://localhost:3090/profile/picture";

class Photo extends Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
  }

  state = {
    imgsrc: "https://via.placeholder.com/150",
    selectedFile:
      "https://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg",
    image:
      "https://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg",
    width: 150,
    height: 150,
    border: 10,
    color: [255, 255, 255, 0.6],
    scale: 1,
    rotate: 0
  };
  componentDidMount() {}
  // handling the zoom , adjust range
  handleRange = event => {
    this.setState({ scale: event.target.value });
  };
  _crop() {
    // image in dataUrl
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  // when file gets seleceted

  handleFile = async event => {
    this.setState(
      {
        image: event.target.files[0],
        selectedFile: global.URL.createObjectURL(event.target.files[0])
      },
      () => {
        console.log("Loaded file: ", this.state.image);
        console.log("Loaded file url string: ", this.state.selectedfile);
        this.handleCanvas(this.state.selectedFile);
      }
    );
  };
  handleCanvas = url => {
    let canvas = this.imageRef.current;
    let context = canvas.getContext("2d");
    let image = new Image();
    image.src = url;
    image.className = "sampleImage";

    image.onload = function() {
      const imageRatio = image.width / image.height;
      const newHeight = canvas.width / imageRatio;
      const newWidth = canvas.height * imageRatio;
      const heightDiff = newHeight - canvas.height;
      const widthDiff = newWidth - canvas.width;
      // if (widthDiff >= heightDiff) {
      //   context1.drawImage(
      //     image,
      //     0,
      //     0,
      //     canvas.width,
      //     canvas.width / imageRatio
      //   );
      // } else {
      //   context1.drawImage(
      //     image,
      //     0,
      //     0,
      //     canvas.height * imageRatio,
      //     canvas.height
      //   );
      // }
      context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };
  };
  // base64 to blob
  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }
  // upload the file
  handleClick = async e => {
    e.preventDefault();
    let canvas = this.imageRef.current;

    let image = await canvas.toDataURL("image/png");
    //let ima = await image.blob();
    let blob = this.dataURItoBlob(image);
    let file = new File([blob], "profile.png", {
      type: "image/png"
    });
    console.log("Image from the canvas: ", image);
    const formData = new FormData();
    formData.append("image", file, file.name);
    axios.post(API_URL, formData).then(res => {
      console.log(res);
    });
    // let data = await response.json();
  };

  // // Crop the image
  // cropImage = event => {
  //   event.preventDefault();
  //   console.log("i am clicked");
  //   let canvas = "";
  //   let canvasScaled = "";
  //   let dataURL = "";
  //   if (this.editor) {
  //     canvas = this.editor.getImage();
  //     canvasScaled = this.editor.getImageScaledToCanvas();
  //     dataURL = canvas.toDataURL("image/png", 0.2);
  //     console.log(dataURL);
  //   }
  //   this.setState({ test: dataURL });
  // };

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
              <div>
                <canvas id="canvas" className="canvas" ref={this.imageRef} />
              </div>
              <br />
              <input
                name="myImage"
                type="file"
                onChange={this.handleFile}
                className=""
              />
            </div>
            <div className="BoxFooter">
              {/* <span>Adjust zoom</span>
              <br />
              <input
                type="range"
                min="1"
                max="10"
                step="0.2"
                value={this.state.scale}
                onChange={this.handleRange}
                className="m-2"
              /> */}
              <br />
              {/* <button className="btn btn-info m-1" onClick={this.cropImage}>
                Crop Image
              </button> */}
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
