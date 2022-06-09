import React from 'react'
import { Grid, Paper, Typography,makeStyles} from "@material-ui/core";
import SelectField from './SelectField';


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
}));

const NavigationSettingCard = ({body,title,name,options,state,handleChange}) => {
    const classes = useStyles();
  return (
    <>
      <Paper className={classes.paper}  style={{ height: "90px", }}>
        <Grid container>
          <Grid item xs={6}>
             <p
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
            </p>
            <p
              style={{
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "14px",
                lineHeight: "15px",
                color: "#747C8B",
              }}
            >
              {body}
            </p>
         
          </Grid>
          <Grid item xs={4}>
            <SelectField
              style={{ width: "100%" }}
              name={name}
              selectValue={state}
              options={options}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default NavigationSettingCard
