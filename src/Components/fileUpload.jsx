import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "../uploader.css";
import "../uploader2.css";
import configData from "./config.json";
import ClipLoader from "react-spinners/ClipLoader";

export class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.fileDownloaddHandler = this.fileDownloaddHandler.bind(this);
    this.state = {
      selectedFile: null,
      resFileName: "",
      showUploadButton: "fresh-button",
      showDownloadButton: "fresh-button hide_data",
      email: this.props.email,
      loading: false,
      exitFlag: false,
    };
  }

  onChangeHandler = (event) => {
    var file = event.target.files;
    if (this.validateSize(event)) {
      this.setState({
        selectedFile: file,
      });
    }
  };
  fileDownloaddHandler = () => {
    var data = this.state;
    console.log(data);
    axios
      .request({
        url: configData.SERVER_URL + "/api/upload/res",
        method: "Post",
        data,
        responseType: "arraybuffer",
      })

      .then((response) => {
        console.log(response);
        //////////////////new code
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "download.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });

    this.setState({
      resFileName: "",
      showDownloadButton: "fresh-button hide_data",
      showUploadButton: "fresh-button",
    });
  };

  fileUploadHandler = () => {
    const data = new FormData();
    if (this.state.selectedFile === null) {
      const err = "No Files selected";
      toast.error(err);
    } else {
      for (var x = 0; x < this.state.selectedFile.length; x++) {
        data.append("file", this.state.selectedFile[x]);
      }
      axios
        .post(configData.SERVER_URL + "/api/upload", data, {
          headers: { email: this.state.email },
        })
        .then((res) => {
          // then print response status
          console.log("Response Received");
          toast.info(
            "File is uploaded & under processing. Please Don't close this pop up"
          );
          this.setState({
            resFileName: res.data,
            showUploadButton: "fresh-button hide_data",
            loading: true,
          });
          var t = 0;
          this.WaitForUpload(res.data, t);
        })
        .catch((error) => {
          console.error("There was an error in uploading data !", error);
          toast.error("Error in uploading, please try again");
        });
    }
  };

  WaitForUpload(filename, t) {
    var outfile = { outfile: filename };
    axios
      .post(configData.SERVER_URL + "/api/upload/status", outfile)
      .then((response) => {
        if (response.data[0].Upload_Status === "Completed") {
          toast.success(
            "File processed successfully! Please download the Response."
          );
          this.setState({
            loading: false,
            showDownloadButton: "fresh-button",
          });
        } else {
          setTimeout(() => {
            if (t <= 400) {
              t++;
              this.WaitForUpload(filename, t);
            } else {
              console.log("timeout reached");
              this.setState({
                loading: false,
                showDownloadButton: "fresh-button",
              });
              toast.error("Application Timed Out");
            }
          }, 5000);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error in fetching upload status data !",
          error
        );
        this.WaitForUpload(filename, t);
      });
  }

  validateSize = (event) => {
    let file = event.target.files;
    let size = 300000000;
    let err = "";

    if (file.length === 0) {
      err = "No Files selected";
      toast.error(err);
    } else {
      for (var x = 0; x < file.length; x++) {
        if (file[x].size > size) {
          err = file[x].type + "is too large, please pick a smaller file\n";
          toast.error(err);
        }
      }
    }
    if (err !== "") {
      event.target.value = null;
      console.log(err);
      return false;
    }
    return true;
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="container">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-1"></div>
              <div className="col-md-6">
                <form method="post" action="#" id="#">
                  <div className="form-group files">
                    <label>
                      {" "}
                      <h4>Upload Your File</h4>{" "}
                    </label>
                    <input
                      type="file"
                      name="file"
                      multiple
                      className="form-control"
                      onChange={this.onChangeHandler}
                    />
                  </div>

                  <div className="col-md-12 pull-right">
                    <button
                      width="100%"
                      type="button"
                      // className="fresh-button hide_data"
                      className={this.state.showUploadButton}
                      onClick={this.fileUploadHandler}
                    >
                      Upload File
                    </button>

                    {this.state.loading ? (
                      <ClipLoader loading={this.state.loading} />
                    ) : (
                      <button
                        width="100%"
                        type="button"
                        className={this.state.showDownloadButton}
                        onClick={this.fileDownloaddHandler}
                      >
                        Download Response
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <div className="col-md-1">
                {" "}
                <button
                  width="100%"
                  type="button"
                  className="btn btn-danger"
                  onClick={this.props.closePopup}
                >
                  X
                </button>
              </div>
              <div className="col-md-1"></div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
