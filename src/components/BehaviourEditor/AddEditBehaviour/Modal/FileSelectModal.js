import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, } from "@material-ui/core";
import SelectField from "../../../common/SelectField";
import TextField from "../../../common/TextField";
import Button from "../../../common/Button";
import S3 from 'react-aws-s3';

const config = {
  bucketName: "aidouserfiles",
  region: "us-east-2",
  accessKeyId: "AKIAVTMWQGEEKQ46K4FG",
  secretAccessKey: "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",
};

const ReactS3Client = new S3(config);

const FileSelectModal = ({ title, open, handleClose, obj, initialState, state, setState, name, handleSave, step_id }) => {

  const handleFile = async (e) => {
    const newFileName = "web/" + `${step_id}_${e.target.name}`
    await ReactS3Client.uploadFile(e.target.files[0], newFileName)
      .then((data) => {
        state[e.target.name] = data.location;
        setState({ ...state });
      })
      .catch((err) => {
        state[e.target.name] = err;
        setState({ ...state });
      });
  }

  const handleChange = (e) => {
    state[e.target.name] = e.target.value;
    setState({ ...state });
  };

  const handleDelete = (e) => {
    handleSave(initialState, name, handleClose);
    setState(initialState);
  };

  return (
    <>
      <Dialog open={open} handleClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          <label htmlFor="upload_file">
            <div style={{ height: '100px', width: '100%', border: '2px dashed black', padding: '60px' }}>
              upload your files
              </div>
          </label>
          <TextField
            type="file"
            accept="audio/*,video/*,video/mkv,media_type"
            name={obj[0].name}
            id="upload_file"
            onChange={handleFile}
            style={{ display: "none" }}
          />

          <SelectField
            label={obj[1].label}
            name={obj[1].name}
            handleChange={handleChange}
            options={obj[1].options} />
        </DialogContent >
        <DialogActions>
          <div style={{ flex: "1" }} />
          <Button name={"Discard"} handleClick={handleDelete} />
          <Button
            name={"Save"}
            handleClick={(e) => handleSave(state, name, handleClose)}
          />
          <div style={{ flex: "1" }} />
        </DialogActions>
      </Dialog >
    </>
  );
};

export default FileSelectModal;
