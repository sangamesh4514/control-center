import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";

const MovementActionCard = ({ title, body, handleChecked, handleClose }) => {
  return (
    <>
      <Paper
        elevation={3}
        style={{
          width: "95%",
          height: "95%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container style={{ textAlign: "center", padding: "5px" }}>
              <Grid item xs={8}>
                <Typography gutterBottom variant="h6">
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Button size="small" onClick={handleClose}>
                  <EditIcon />{" "}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              noWrap={true}
            >
              {body}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  value="small"
                  disableRipple
                  onChange={handleChecked}
                />
              }
              label="Complete"
              labelPlacement="start"
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default MovementActionCard;
