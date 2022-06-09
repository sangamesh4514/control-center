import React from 'react'
import { Grid, Paper, Switch, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    background:
      "linear-gradient(182.87deg, rgba(255, 255, 255, 0.05) 0.69%, rgba(213, 232, 248, 0.05) 95.8%), #EBF2F8",
    border: "2.5px solid rgba(255, 255, 255, 0.9)",
    boxSizing: " border-box",
    padding: "1em",
    boxShadow: "inset 1px 1px 1px rgba(255, 255, 255, 0.241013)",
    borderRadius: "12px",
  },
}));
const DataCard = ({title,body,value,time,unit}) => {
  const classes=useStyles()
  return (
    <>
      <Paper
        elevation={10}
        // style={{ height: "50px", width: "100%", marginTop: "10px" }}
        className={classes.paper}
      >
        <Grid container>
          <Grid item xs={2}>
            <Typography variant="subtitle2">{title}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle2">{body}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">
              {value} {unit}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle2">
              {`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}
              {time.getHours()>11?" PM":" AM"}
            </Typography>
            <Typography variant="subtitle2">
              {" "}
              {`${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default DataCard
