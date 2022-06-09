import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import Radio from './Radio';

const ModesCard = ({title,body,value,checked,handleChecked}) => {
  return (
    <>
      <Grid
        container
        style={{ borderTop: "1px solid grey", paddingTop: "10px" }}
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={3}>
              <Radio
                value={value}
                checked={checked}
                handleChecked={handleChecked}
              />
            </Grid>
            <Grid item xs={9}>
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
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ModesCard
