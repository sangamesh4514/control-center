import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Switch from "./Switch";

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

const AiCard = ({
  mainTitle,
  title1,
  body1,
  name1,
  state1,
  handleChange1,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} style={{ marginTop: "20px" }}>
        <Grid container>
          <Paper
            className={classes.paper}
            style={{ height: "130px", width: "100%" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <p className={classes.title}>{mainTitle}</p>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={11}>
                    <p className={classes.title}>{title1}</p>
                    <p className={classes.subtitle}>{body1}</p>
                  </Grid>
                  <Grid item xs={1}>
                    <Switch
                      checked={state1}
                      onChange={handleChange1}
                      color="primary"
                      name={name1}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AiCard;
