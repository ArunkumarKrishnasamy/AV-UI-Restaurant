import axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function Add_Photo() {
  const [showImage, setShowImage] = useState(false);
  const HandleFile = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setShowImage(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      axios.post("http://localhost:3001/upload", formData).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.error(error);
    }
  };
  const [file, setFile] = useState(null);
  const HandleRemoveFile = (e) => {
    setFile(null);
    setShowImage(false);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: HandleFile,
    accept: "image/*",
    maxFiles: 1,
    multiple: false,
  });
  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {showImage ? (
        <>
          <img
            className="img-fluid"
            src={URL.createObjectURL(file)}
            alt="Upoaded file"
            style={{
              display: "block",
              width: "120px",
              height: "80px",
              borderRadius: "10px",
              borderWidth: "2px",
              borderColor: "#707070",
            }}
          />
        </>
      ) : (
        <button
          style={{
            display: "block",
            width: "120px",
            height: "80px",
            borderRadius: "10px",
            borderWidth: "2px",
            borderColor: "#707070",
          }}
        >
          <input
            type="file"
            onChange={HandleFile}
            id="getFile"
            style={{ display: "none" }}
            {...getInputProps()}
            formEncType="multipart/form-data"
          ></input>
          <span className="material-symbols-outlined">add_a_photo</span>
        </button>
      )}
      {file && (
        <div className="row">
          <p
            className="col-8 text-wrap"
            style={{ width: "8rem", overflow: "visible" }}
          >
            {file.name}
          </p>
        </div>
      )}
    </div>
  );
}

export default Add_Photo;
