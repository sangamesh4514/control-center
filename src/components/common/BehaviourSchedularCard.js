import {
  Grid,
  Paper,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import editicon from "./Group525.svg";
import deleteicon from "./Group526.svg";
import React from 'react'

const useStyles = makeStyles((theme) => ({
  paper: {
    background:
      "linear-gradient(182.87deg, rgba(255, 255, 255, 0.05) 0.69%, rgba(213, 232, 248, 0.05) 95.8%), #EBF2F8",
    border: "2.5px solid rgba(255, 255, 255, 0.9)",
    boxSizing: " border-box",
    padding: "1em",
    boxShadow: "inset 1px 1px 1px rgba(255, 255, 255, 0.241013)",
    borderRadius: "12px",
    boxShadow: "7px 4px 14px #DCE7F1;",
  },
  title: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "15px",
    color: "#747C8B",
  },
  subtitle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "10px",
    color: "#747C8B",
  },
}));

const BehaviourSchedularCard = ({
  index,
  title,
  behaviour,
  body1,
  body2,
  handleDelete,
  handleEdit,
}) => {
  const classes = useStyles();
  return (
    <>
      <Paper
        className={classes.paper}
        style={{ height: "90px", width: "100%" }}
      >
        <Grid container style={{ paddingTop: "10px", paddingLeft: "20px" }}>
          <Grid item xs={4}>
            <p className={classes.title}>
              <b>Name</b> : {title}
            </p>
            <p className={classes.subtitle}>
              <b>Behavior</b> : {behaviour}
            </p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.title}>
              <b>Repeat</b> {body1}
            </p>
            <p className={classes.subtitle}>
              <b>Scheduled on </b>
              {body2}
            </p>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={() => handleEdit(index)}
              style={{
                border: "2.5px solid rgba(255, 255, 255, 0.4)",
                margin: "0 0.5em",
              }}
            >
              <img
                src={editicon}
                style={{
                  width: "0.5em",
                }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={() => handleDelete(index)}
              style={{
                border: "2.5px solid rgba(255, 255, 255, 0.4)",
                margin: "0 0.5em",
              }}
            >
              <img
                src={deleteicon}
                style={{
                  width: "0.5em",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default BehaviourSchedularCard
