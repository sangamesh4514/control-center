import {
  Grid,
  IconButton,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    background:
      "linear-gradient(182.87deg, rgba(255, 255, 255, 0.05) 0.69%, rgba(213, 232, 248, 0.05) 95.8%), #EBF2F8",
    border: "2.5px solid rgba(255, 255, 255, 0.9)",
    boxSizing: " border-box",
    padding: "0.5em",
    boxShadow: "inset 1px 1px 1px rgba(255, 255, 255, 0.241013)",
    borderRadius: "12px",
    boxShadow: "7px 4px 14px #DCE7F1;",
  },
}));

const CustomizationCard = ({ icon, title, body, route, data }) => {
  const history = useHistory();

  const classes = useStyles();

  const routeMe = (route) => {
    // console.log(route);
    history.push(`${route}`, data);
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={10}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "15px",
                    lineHeight: "15px",
                    color: "#747C8B",
                  }}
                >
                  {title}
                </span>
              </Grid>
              <Grid item xs={12}>
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "14px",
                    // lineHeight: "15px",
                    color: "#747C8B",
                  }}
                >
                  {body}
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid xd={2}>
            <IconButton
              style={{ padding: "5px" }}
              onClick={() => routeMe(route)}
            >
              <NavigateNextOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default CustomizationCard;
