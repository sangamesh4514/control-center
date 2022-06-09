import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import useStyles from "./styles";
import TextField from "./../common/TextField";
import Button from "./../common/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const NewFace = ({ open, handleClose,data,setData,rosLoader,rosMessage ,handleFile,handleChange,handleSubmit}) => {
  const classes = useStyles();
  const handleDiscard=()=>{
     setData({
       name: "",
       updateName: null,
       image: null,
     });
     handleClose()
  }
  return (
    <>
      <Dialog
        // fullWidth
        // maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        open={open}
        // onClose={handleClose}
      >
        <Grid container className={classes.modal} style={{ width: "600px" }}>
          <Grid item xs={12} style={{ paddingTop: "20px" }}>
            <p
              style={{
                textAlign: "center",
                color: "#626976",
                fontSize: "25px",
                marginBottom: "0px",
              }}
            >
              Train a new face
            </p>
          </Grid>{" "}
          <Grid
            item
            xs={12}
            className={classes.title}
            style={{ padding: "20px 20px 0px 20px" }}
          >
            Choose Name
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 20px 0px 20px" }}>
            <TextField
              // disabled={id}
              name="name"
              value={data.name}
              style={{ width: "100%" }}
              onChange={handleChange}
              label="Name"
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.title}
            style={{ padding: "30px 20px 10px 20px" }}
          >
            Choose Image
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label htmlFor="upload_file">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "300px",
                  width: "550px",
                  // border: "1px dashed grey",
                  borderRadius: "10px",
                }}
                className={classes.image}
              >
                {data.image ? (
                  <img
                    src={URL.createObjectURL(data.image)}
                    alt="Aido"
                    height="100%"
                    width="100%"
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <h6 style={{ color: "#626976", fontSize: "25px" }}>
                    Upload image
                  </h6>
                )}
              </div>
            </label>
            <TextField
              type="file"
              accept="image/*"
              name="image"
              id="upload_file"
              onChange={handleFile}
              style={{ display: "none" }}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "30px 20px 10px 20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {rosLoader ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress
                      variant={"indeterminate"}
                      style={{ height: "25px", width: "25px", color: "grey" }}
                    />

                    <p style={{ color: "#626976", fontSize: "12px" }}>
                      {rosMessage}
                    </p>
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={handleDiscard}
                  disabled={rosLoader}
                  name="Discard"
                  style={{ width: "100%" }}
                ></Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={(e) => handleSubmit(handleDiscard)}
                  disabled={!data.name || !data.image || rosLoader}
                  name="Create"
                  style={{ width: "100%" }}
                ></Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default NewFace;
