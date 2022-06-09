import React from 'react';
import { Paper, Grid, IconButton } from '@material-ui/core';
import useStyles from './styles.js';
import { useDispatch } from 'react-redux';
import ImageIcon from "@material-ui/icons/Image";
import dateFormat from 'dateformat';
import { behaviourDeleteApi } from '../../redux/slices/BehaviourSlice.js';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import editicon from './Group525.svg';
import deleteicon from './Group526.svg';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}


const BehaviourList = (props) => {
  const [openSBar, setOpenSBar] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const classes = useStyles();
  const dispatch = useDispatch();
  const list = props.list;
  let date = props.data.last_edited;
  date = dateFormat(date, "mmmm dS, yyyy");

  const handleDel = (id, robot_id) => () => {
    console.log(id, robot_id);
    dispatch(behaviourDeleteApi(id, robot_id));
    props.setList(list.filter((el) => el.id !== id));
    setTransition(() => TransitionRight);
    setOpenSBar(true);
  }

  const datapack = {
    behavior_id: props.data.id,
    behavior_name: props.data.name,
    behavior_description: props.data.description,
    behavior_image_url: props.data.image_url,
    behavior_robot_id: props.data.robot_id,
    behavior_start_from: props.data.start_from,
    behavior_repeat_sequence: props.data.repeat_sequence
  };

  const handleClose = () => {
    setOpenSBar(false);
  };

  return (
    <>
      <div style={{
        width: '50em',
        background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8',
        border: '2.5px solid rgba(255, 255, 255, 0.6)',
        padding: '1em',
        borderRadius: '1em',
        margin: '1em 0'
      }}>
        <span style={{
          verticalAlign: 'text-bottom',
          display: 'inline-block'
        }}>
          {!props?.data?.image_url || props?.data?.image_url === 'null' ? (<ImageIcon style={{ fontSize: '4em', margin: '0px 25px 0px 15px' }} />) : (<img style={{
            width: '5em', height: '4em', margin: '0em 1em',
            borderRadius: '1em'
          }} src={props.data.image_url} />)}
        </span>
        <span style={{ verticalAlign: 'text-bottom', display: 'inline-block' }}>
          <b>{props.data.name}</b>
          <br></br>
          {props.data.description !== null && <i>{props?.data?.description}</i>}
          <br></br>
          <small>last edited: {date}</small>
        </span>
        <span style={{ verticalAlign: 'text-bottom', display: 'inline-block', float: 'right' }}>
          <Grid
            item xs={2}
            style={{ display: 'table-cell', padding: '1em' }}
          >
            <IconButton
              aria-label="Edit"
              onClick={() => props.handleEditBehavior(datapack)}
              style={{
                border: '2.5px solid rgba(255, 255, 255, 0.4)',
                margin: '0 0.5em'
              }}>
              <img src={editicon} style={{
                width: '0.5em'
              }} />
            </IconButton>
            <IconButton
              aria-label="Delete"
              onClick={handleDel(props.data.id, props.data.robot_id)}
              style={{
                border: '2.5px solid rgba(255, 255, 255, 0.4)',
                margin: '0 0.5em'
              }}>
              <img src={deleteicon} style={{
                width: '0.5em'
              }} />
            </IconButton>
          </Grid>
        </span>
      </div>
      <Snackbar
        open={openSBar}
        onClose={handleClose}
        TransitionComponent={transition}
        message="NOTE: Behavior Deleted!"
        key={transition ? transition.name : ''}
        autoHideDuration="2000"
      />
    </>
  );
}

export default BehaviourList;
