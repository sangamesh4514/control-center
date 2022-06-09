import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import React from 'react'
import PersonIcon from "@material-ui/icons/Person";
import Radio from './Radio';

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

const HomescreenCard = ({title,body,value,checked,handleChecked}) => {

  const classes = useStyles();
  return (
    <>
      <Paper className={classes.paper}>
        <Grid container style={{ paddingTop: "15px", paddingBottom: "15px" }}>
          <Grid
            xd={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "5px",
            }}
          >
            <Radio
              value={value}
              checked={checked}
              handleChecked={handleChecked}
            />
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PersonIcon />
          </Grid>
          <Grid item xs={8}>
            <p className={classes.title}>{title}</p>
            <p className={classes.subtitle}>{body}</p>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default HomescreenCard
