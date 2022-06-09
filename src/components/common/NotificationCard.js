import React from 'react'
import { Grid, Paper, Typography ,makeStyles} from "@material-ui/core";
import Button from "./../common/Button"
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
    // paddingTop:"5px"
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


const NotificationCard = ({title,body,time,name,message,id,handleDelete}) => {
  const classes=useStyles()
  return (
    <>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={2}>
            <p className={classes.title}>{name}</p>
          </Grid>
          <Grid item xs={2}>
            <p className={classes.title}>{title}</p>
            <p className={classes.subtitle}>{body}</p>
          </Grid>
          <Grid item xs={4}>
            <p className={classes.title}>{message}</p>
          </Grid>
          <Grid item xs={2}>
            <p className={classes.title}>
              {time?.split("T")[1]?.split(".")[0]}
            </p>
            <p className={classes.title}>{time?.split("T")[0]}</p>
          </Grid>
          <Grid item xs={2}>
            <Button
              name={"Delete"}
              onClick={(e) => handleDelete(id)}
              style={{ padding: "10px 10px" }}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default NotificationCard
