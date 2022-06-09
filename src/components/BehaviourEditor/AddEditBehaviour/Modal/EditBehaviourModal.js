import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";
import TextField from "../../../common/TextField";
import Button from "../../../common/Button";
import { initialBehaviour } from "../BehaviourData";
import S3 from "react-aws-s3";

const config = {
  bucketName: "aidouserfiles",
  region: "us-east-2",
  accessKeyId: "AKIAVTMWQGEEKQ46K4FG",
  secretAccessKey: "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",
};
const ReactS3Client = new S3(config);

const EditBehaviourModal = ({
  open,
  title,
  handleClose,
  obj,
  state,
  setState,
  handleSave,
  currentImage
}) => {
  const [file, setFile] = useState(null);
  const [behaviour, setBehaviour] = useState(initialBehaviour);

  const handleChange = (e) => {
    state[e.target.name] = e.target.value;
    setState({ ...state });
  };  
  console.log(behaviour.image);
  const handleFile = async (e) => {
    console.log("file insider", e.target.name);
    const newFileName = "web/" + `${e.target.name}`;
    console.log(newFileName.Location);
    await ReactS3Client.uploadFile(e.target.files[0], newFileName)
      .then((data) => {
        console.log(data);
        setFile(data.location);
        console.log(file);
        state[e.target.name] = data.location;
        setState({ ...state });
      })
      .catch((err) => {
        state[e.target.name] = err;
        setState({ ...state });
      });
  };

  const fields = obj.map((data, index) => {
    return (
      <>
        <label htmlFor={data.name}>{data.label}</label>
        <TextField
          key={index++}
          name={data.name}
          value={state[data.name]}
          onChange={handleChange}
        />
      </>
    );
  });

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {fields}
          <label htmlFor="upload_file">
            <div
              style={{
                height: '8em',
                width: '8em',
                border: '2px dashed black',
                overflow: 'hidden',
                marginTop: '2em',
              }}
            >
              {currentImage && !file && <img style={{ width: '100%' }} src={currentImage} />}
              {file && <img style={{ width: '100%' }} src={file} />}
              <br />
              {file === null && "Upload image here"}
            </div>
          </label>

          <input
            type="file"
            accept="image/*,video/mkv,media_type"
            name="image"
            id="upload_file"
            onChange={(e) => handleFile(e)}
          style={{ display: "none" }}
          />
        </DialogContent>
        <DialogActions>
          <div style={{ flex: "1" }} />
          <Button name={"close"} handleClick={handleClose} />
          <Button
             name={"save"}
            disabled={!state.name}
            handleClick={handleSave}
          />
          <div style={{ flex: "1" }} />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditBehaviourModal;
