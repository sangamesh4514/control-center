import React, { useState, useEffect } from "react";
import { Paper, Button, AppBar, Toolbar, Modal, CardActionArea, CardContent, CardActions, Card, Typography, Select, MenuItem, Grid } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { EditMovementBody } from "../Behaviour Modal/EditMovementBody";
import { EditHeadBody } from "../Behaviour Modal/EditHeadBody";
import { EditSpeakBody } from "../Behaviour Modal/EditSpeakBody";
import { EditAudioBody } from "../Behaviour Modal/EditAudioBody";
import { EditVideoBody } from "../Behaviour Modal/EditVideoBody";
import { EntryBehaviourModal } from "../Behaviour Modal/EntryBehaviourModal";
import { useDispatch } from "react-redux";
import { behaviourStepsApi, behaviourStepsUpdateApi, behaviourUpdateApi } from '../../../redux/slices/BehaviourSlice';
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from '@material-ui/icons/Delete';
import location from './location.svg';
import actionadd from './actionAdd.svg';
import speakicon from './Group5.svg';
import headicon from './Frame.svg';
import audioicon from './Path181.svg';
import videoicon from './playlist.svg';
import deleteico from './deleteicon.svg';
import speaksm from './speaksm.svg';
import mapsm from './mapsm.svg';
import videosm from './videosm.svg';
import audiosm from './audiosm.svg';
import headsm from './headsm.svg';
import editicon from './Group525.svg';
import backicon from './back.svg';
import Classes from './behaviour.module.css';
import { indexOf } from "lodash";
import Loader from "../../common/DataLoaderGif/Loader";


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    borderCollapse: 'inherit'
  },
  MuiTableCellRoot: {
    padding: '4em'
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  actions: {
    // background: 'linear - gradient(182.87deg, rgba(255, 255, 255, 0.05) 0.69 %, rgba(213, 232, 248, 0.05) 95.8 %), #EBF2F8',
    // border: '2.5px solid rgba(255, 255, 255, 0.64)',
    // borderRadius: '1em',
    // display: 'block',
    // margin: '0.5em'
    padding: '0.5em',
    maxWidth: '14em',

  },
  tableCell: {
    border: 'none'
  },
  cardRoot: {
    background: 'linear-gradient(181.59deg, #5ACBFF 0.19%, #3DB0FF 96.59%)',
    color: 'white',
    borderRadius: '1em',
    margin: '-0.2em'
  },
  paper: {
    margin: '0 0 7em 0',
    border: '2.5px solid #F2F9FF',
    borderRadius: '1.5em',
    color: '#747C8B',
    background: '#EAF1F8',
    borderRadius: '1.5em',
    padding: '1em 2em'
  },
  imagePaper: {
    boxShadow: 'inset 2px 2px 3px #bfd3e5, inset -2px -2px 6px rgb(255 255 255 / 80%)',
    margin: 'auto',
    width: '16em',
    height: '14em'
  },
  buttonui: {
    background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F8',
    boxShadow: 'inset 1px 1px 1px rgb(255 255 255/24%)',
    border: '2.5px solid rgba(255, 255, 255, 0.6)',
    boxSizing: 'border-box',
    borderRadius: '50px',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '18px',
    textAlign: 'center',
    letterSpacing: '0.00310565px',
    textTransform: 'capitalize',
    color: 'rgba(116, 124, 139, 0.72)',
    margin: '0 0.5em 0.5em 0.5em'
  },
  textField: {
    margin: '0 0 2em 0',
    background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F9',
    boxShadow: 'inset 2px 2px 3px #bfd3e5, inset -2px -2px 6px rgb(255 255 255 / 80%)',
    borderRadius: '10px',
    border: 'none',
    padding: '0.5em',
    width: '-webkit-fill-available',
    color: '#747C8B',
    '&::focus-visible': {
      border: 'none'
    }
  },
  actionCubic: {
    padding: '1em',
    border: '2.5px solid rgba(255, 255, 255, 0.64)',
    background: 'linear-gradient(182.87deg, rgba(255, 255, 255, 0.05) 0.69 %, rgba(213, 232, 248, 0.05) 95.8 %), #EBF2F8',
    borderRadius: '1em',
    maxHeight: '9em'
  },
  actionCubicImg: {
    margin: '0.5 3em'
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    left: '11em',
    borderRadius: '2em',
    width: 'fit-content',
    margin: '0 0 0 9.5em'
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

const AddEditBehaviour = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const navbehaviorID = history?.location.state;

  useEffect(async () => {
    if (navbehaviorID?.behavior_id) {
      setLoading(true)

      console.log('[GET BEHAVIORS]', navbehaviorID);
      setBarData({
        ...barData,
        start_from: navbehaviorID.behavior_start_from,
        repeat_sequence: navbehaviorID.behavior_repeat_sequence,
        robot_id: navbehaviorID.behavior_robot_id,
      })
      setBehavior_id(navbehaviorID.behavior_id);
      getSteps(navbehaviorID.behavior_id);
      getBehaviorInfo(navbehaviorID);
    }
  }, []);
  const [entryOpen, setEntryOpen] = useState(navbehaviorID?.behavior_id ? false : true);
  useEffect(async () => {
    await axios.get(`https://ingendynamics.com/api/v1/user/all-robot?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        console.log(res)
        let temp = [];
        for (var i = 0; i < res.data.data.length; i++) {
          temp.push(res.data.data[i])
        }
        setInitialRobot(temp[0]);
        setRobotList(temp);
      }).catch(error => {
        if (error?.response?.status === 500) {
          alert('SERVER UNDER MAINTAINENCE, Try again!');
        }
      });
  }, []);

  const [initialRobot, setInitialRobot] = useState({});
  let [behavior_id, setBehavior_id] = useState('');
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

  const [steps, setSteps] = useState([]);
  const [updatedSteps, setUpdatedSteps] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [reset, setReset] = useState(false);
  const [indexShuffle, setIndexShuffle] = useState(false);
  const [headOpen, setHeadOpen] = React.useState(false);
  const [speakOpen, setSpeakOpen] = React.useState(false);
  const [audioOpen, setAudioOpen] = React.useState(false);
  const [videoOpen, setVideoOpen] = React.useState(false);
  const [deleteAction, setDeleteAction] = React.useState(false);
  const [rowID, setRowID] = useState(null);
  const [iDNullValidator, setIDNullValidator] = useState(false);
  const [actions, setActions] = useState({
    movement: false,
    speak: false,
    video: false,
    audio: false,
    head: false
  });


  const locationList = [
    'Living Room',
    'Main Gate',
    'Bed Room'
  ];

  const [newMovement, setNewMovement] = useState({
    location_robot_id: null,
    location_name: locationList[0],
    location_delay: '0s'
  });
  const [newHead, setNewHead] = useState({
    pan: 30,
    pan_delay: '0s',
    tilt: 30,
    tilt_delay: '0s',
  });
  const [newSpeak, setNewSpeak] = useState({
    tts: null,
    tts_on_screen_flag: null,
    tts_delay: '0s',
  });
  const [newAudio, setNewAudio] = useState({
    audio_link: null,
    audio_delay: '0s',
  });
  const [newVideo, setNewVideo] = useState({
    media_link: null,
    media_delay: '0s',
  });
  const [editMovement, setEditMovement] = useState(false);
  const [editSpeak, setEditSpeak] = useState(false);
  const [editAudio, setEditAudio] = useState(false);
  const [editVideo, setEditVideo] = useState(false);
  const [editHead, setEditHead] = useState(false);
  const [behaviorEdit, setBehaviorEdit] = useState(false);
  const [delay, setDelay] = useState([]);
  const [currentActionRow, setCurrentActionRow] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [robotList, setRobotList] = useState([]);
  const [pan, setPan] = useState([]);
  const [tilt, setTilt] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [behaviorDetails, setBehaviorDetails] = useState({
    behavior_image: null,
    behavior_name: null,
    behavior_description: null
  });
  const [stepIndexing, setStepIndexing] = useState(false);


  const initialLocation = locationList[0];
  const [barData, setBarData] = useState({
    start_from: 'Start From 1',
    repeat_sequence: 'No Repeat',
    robot_id: null,
  });

  const rseqList = [
    'No Repeat',
    'Loop',
    'Repeat 1 time'
  ];

  useEffect(() => {
    steps.forEach(stepID => {
      if (
        stepID.location_name === null &&
        stepID.pan === null &&
        stepID.tilt === null &&
        stepID.tts === null &&
        stepID.media_link === null &&
        stepID.audio_link === null) {
        setSteps(steps.filter((el, index, array) => el.id ? el.id !== stepID.id : index !== steps.indexOf(stepID)));
        // setSteps(steps.filter((el) => el.step_id !== stepID.step_id));
        if (stepID.id) {
          deleteStep(stepID.id);
        }
      }
    });
    setDeleteAction(false);
    // setStepIndexing(true);
  }, [deleteAction === true]);

  const handleSpecificActionDelete = (row, action) => () => {
    console.log(row, action);

    const actionIndex = steps.indexOf(row);

    let actionel;

    const data = [...steps];

    if (action === 'movement') {
      actionel = {
        ...data[actionIndex],
        location_name: null,
        location_delay: '0s'
      }
    } else if (action === 'speak') {
      actionel = {
        ...data[actionIndex],
        tts: null,
        tts_delay: null
      }
    } else if (action === 'video') {
      actionel = {
        ...data[actionIndex],
        media_link: null,
        media_delay: null
      }
    } else if (action === 'audio') {
      actionel = {
        ...data[actionIndex],
        audio_link: null,
        audio_delay: null
      }
    } else if (action === 'head') {
      actionel = {
        ...data[actionIndex],
        pan: null,
        pan_delay: null,
        tilt: null,
        tilt_delay: null,
      }
    }

    data[actionIndex] = actionel;

    setSteps(data);

    setDeleteAction(true);

  }




  const clearStep = (steps) => {

  }

  const handleRow = () => {

    console.log(steps)

    setSteps([
      ...steps,
      {
        // step_id: steps.length + 1,
        id: null,
        behavior_id: behavior_id,
        location_robot_id: null,
        location_name: null,
        location_delay: '0s',
        location_must_complete: false,
        tts: null,
        tts_on_screen_flag: false,
        tts_delay: null,
        media_link: null,
        media_delay: null,
        audio_link: null,
        audio_delay: null,
        pan: null,
        pan_delay: null,
        tilt: null,
        tilt_delay: null
      }]);



  }

  const deleteStep = async (stepId) => {
    await axios.delete(`https://ingendynamics.com/api/v1/user/step/${stepId}?userId=${userId}&behaviorId=${behavior_id}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        console.log('[STEP DELETED]')
      }).catch(error => {
        if (error?.response?.status === 500) {
          alert('SERVER UNDER MAINTAINENCE, Try again!');
        }
      });
  }


  useEffect(() => {
    if (stepIndexing === true) {

      steps.map((el, index, array) => {
        console.log(el, index, array)
        let indexing = index + 1;
        const newArray = [...steps];
        newArray[index].step_id = indexing;
        setSteps(newArray);
      })
      setStepIndexing(false);
    }
  }, [stepIndexing === true]);

  const handleSpecificDeleteRow = (row) => () => {

    console.log('[PRE DELETE STEPS]', row);
    const indexNum = steps.indexOf(row);
    setSteps(steps.filter((el, index, array) => el.id ? el?.id !== row?.id : index !== indexNum));
    console.log('[POST DELETE STEPS]', steps);

    // setStepIndexing(true);
    if (row.id) {
      deleteStep(row.id);
    }

  }

  function handleActionModal(action) {
    setActions({
      ...actions,
      [action]: true,
    });
    if (action === 'head') {
      setHeadOpen(true);
    } else if (action === 'movement') {
      setOpen(true);
    } else if (action === 'speak') {
      setSpeakOpen(true);
    } else if (action === 'audio') {
      setAudioOpen(true);
    } else if (action === 'video') {
      setVideoOpen(true);
    }
  }

  const rowSetter = (action, row, index, edit) => () => {
    console.log()
    setRowID(steps.indexOf(row))
    const row_id = steps.indexOf(row);
    if (edit === true && action === 'movement') {
      setEditMovement(true);
    } else if (edit === true && action === 'speak') {
      setEditSpeak(true);
    } else if (edit === true && action === 'video') {
      setEditVideo(true);
    } else if (edit === true && action === 'audio') {
      setEditAudio(true);
    } else if (edit === true && action === 'head') {
      setEditHead(true);
    }
    setCurrentActionRow(steps[row_id]);
    handleActionModal(action);
  }

  const handleClose = () => {
    setActions({ ...actions, movement: false });
    setOpen(false);
    setEditMovement(false);
  }

  const handleBehaviourModalClose = () => {
    setBehaviorDetails({
      ...behaviorDetails
    })
    setEntryOpen(false);
  }

  const handleHeadClose = () => {
    setActions({ ...actions, head: false });
    setHeadOpen(false);
  }

  const handleSpeakClose = () => {
    setActions({ ...actions, speak: false });
    setSpeakOpen(false);
    // setEditSpeak(false);
  }

  const handleAudioClose = () => {
    setActions({ ...actions, audio: false });
    setAudioOpen(false);
  }

  const handleVideoClose = () => {
    setActions({ ...actions, video: false });
    setVideoOpen(false);
  }

  // working

  const setImage = (data) => {
    console.log(data);
    setBehaviorDetails({
      ...behaviorDetails,
      behavior_image: data
    });
  }

  const getBehaviorInfo = async (data) => {
    console.log(data)
    setBehaviorDetails({
      behavior_name: data.behavior_name,
      behavior_description: data.behavior_description,
      behavior_image: data.behavior_image_url
    });
    setBarData({
      start_from: data.behavior_start_from,
      repeat_sequence: data.behavior_repeat_sequence,
      robot_id: data.behavior_robot_id,
    })
  }

  const getSteps = async (id) => {
    await axios.get(`https://ingendynamics.com/api/v1/user/step?userId=${userId}&behaviorId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        console.log(res);
        setSteps(res.data.data);
        setLoading(false);
        console.log(steps);
      }).catch(error => {
        if (error?.response?.status === 500) {
          alert('SERVER UNDER MAINTAINENCE, Try again!');
        }
      });
  }


  useEffect(async () => {
    await axios.get(`https://ingendynamics.com/api/v1/user/timedelay?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        const timer = res.data.data;
        Object.keys(timer).map(res => {
          setDelay(delay => delay.concat(timer[res].delay));
        }
        )
      }).catch(error => {
        if (error?.response?.status === 500) {
          alert('SERVER UNDER MAINTAINENCE, Try again!');
        }
      });
  }, []);

  useEffect(async () => {
    await axios.get(`https://ingendynamics.com/api/v1/user/tilt?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        const tiltData = res.data.data;
        Object.keys(tiltData).map(res => {
          setTilt(tilt => tilt.concat(tiltData[res].angle));
        }
        )
      }).catch(error => {
        if (error?.response?.status === 500) {
          alert('SERVER UNDER MAINTAINENCE, Try again!');
        }
      });
  }, []);

  useEffect(async () => {
    await axios.get(`https://ingendynamics.com/api/v1/user/pan?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res => {
        const panData = res.data.data;

        Object.keys(panData).map(res => {
          setPan(pan => pan.concat(panData[res].angle));
        }
        )
      }).catch(error => {
        if (error?.response?.status === 500) {
          alert('SERVER UNDER MAINTAINENCE, Try again!');
        }
      });
  }, []);

  const handleBehaviorChange = ({ target }) => {
    const { name, value } = target;


    setBehaviorDetails({
      ...behaviorDetails,
      [name]: value
    });
  }

  /**
    * Represents Create New Behavior Module
    * @module {function} Add Behavior
    */
  const addApi = async (data) => {
    await axios.post(`https://ingendynamics.com/api/v1/user/behavior?robotId=${initialRobot.robot_id}&userId=${userId}`,
      {
        name: data.behavior_name,
        description: data.behavior_description,
        image_url: data.behavior_image,
        robot_id: initialRobot.robot_id
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then((res) => {
        console.log("Behaviour Add API Checkpoint: ", data);
        const behaviour_id = res.data.data.behavior_id;
        console.log(res.data.data.behavior_id);
        setBehavior_id(behaviour_id);
        localStorage.setItem("behaviour_id", behaviour_id);
        if (res.status === 200) {
          console.log("behaviour ", behaviour_id);
        };
        setBehaviorDetails(data)
      }).catch(error => {
        if (error?.response?.status === 500) {
          alert('SERVER UNDER MAINTAINENCE, Try again!');
        }
      });
  }

  const updateBehaviour = (data, behavior_id) => {
    console.log('[UPDATE BEHAVIOR APi]', data, behavior_id, userToken)
    axios.put(`https://ingendynamics.com/api/v1/user/behavior/${behavior_id}?userId=${userId}`,
      {
        name: data.behavior_name,
        description: data.behavior_description,
        image_url: data.behavior_image,
        start_from: data.start_from,
        repeat_sequence: data.repeat_sequence,
        robot_id: data.robot_id
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(() => {
        console.log(data)
        setBehaviorDetails({
          ...behaviorDetails,
          behavior_name: data.behavior_name,
          behavior_description: data.behavior_description,
          behavior_image: data.behavior_image
        })
      }
      ).catch(error => {
        if (error?.response?.status === 500) {
          alert('SERVER UNDER MAINTAINENCE, Try again!');
        }
      });
  }

  const handleBehaviorSubmit = (data) => {
    console.log(data);


    data.robot_id = initialRobot.robot_id;

    if (behaviorEdit === true) {
      console.log('EDIT/UPDATE insider')
      updateBehaviour(data, behavior_id);
    } else {
      addApi(data);
    }

    handleBehaviourModalClose(true);
  }



  const handleSpeakChange = ({ target }) => {
    const { name, value } = target;


    setNewSpeak({
      ...newSpeak,
      [name]: value
    });
  }

  const handleAudioChange = ({ target }) => {
    const { name, value } = target;
    setNewAudio((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleVideoChange = ({ target }) => {
    const { name, value } = target;
    setNewVideo((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleHeadChange = ({ target }) => {

    const { name, value } = target;
    setNewHead((prev) => ({
      ...prev,
      [name]: value
    }));
  }


  const handleSpeakSubmit = (event) => {

    event.preventDefault();
    const stepIndex = currentActionRow.step_id;

    let miniObj3 = {
      tts: !newSpeak.tts ? steps[stepIndex].tts : newSpeak.tts,
      tts_on_screen_flag: !newSpeak.tts_on_screen_flag ? steps[stepIndex].tts_on_screen_flag : newSpeak.tts_on_screen_flag,
      tts_delay: !newSpeak.tts_delay ? steps[stepIndex].tts_delay : newSpeak.tts_delay,
    }

    const items = [...steps];

    let item3 = {
      ...items[stepIndex],
      tts: miniObj3.tts,
      tts_on_screen_flag: miniObj3.tts_on_screen_flag,
      tts_delay: miniObj3.tts_delay,
    }

    items[stepIndex] = item3;

    setSteps(items);

    if (editSpeak === false) {
      setNewSpeak({ ...newSpeak, tts: '', tts_delay: '0s' });
    } else if (editSpeak === true) {
      setNewSpeak({ ...newSpeak, tts: '', tts_delay: '0s' });
    }

    setDisabled(true);
    handleSpeakClose(true);
    setEditSpeak(false);
  }


  const handleAudioSubmit = (event) => {

    event.preventDefault();
    const stepIndex = currentActionRow.step_id;

    let miniObj4 = {
      audio_link: !newAudio.audio_link ? steps[stepIndex].audio_link : newAudio.audio_link,
      audio_delay: !newAudio.audio_delay ? steps[stepIndex].audio_delay : newAudio.audio_delay
    }

    const items = [...steps];

    let item4 = {
      ...items[stepIndex],
      audio_link: miniObj4.audio_link,
      audio_delay: miniObj4.audio_delay,
    }

    items[stepIndex] = item4;

    setSteps(items);

    if (editAudio === false) {
      setNewAudio({ ...newAudio, audio_link: null, audio_delay: '0s' });
    } else if (editAudio === true) {
      setNewAudio({ ...newAudio, audio_link: null, audio_delay: '0s' })
    }

    setDisabled(true);
    handleAudioClose(true);
    setEditAudio(false);
  }

  const handleVideoSubmit = (event) => {

    event.preventDefault();
    const stepIndex = currentActionRow.step_id;

    console.log(newVideo)

    let miniObj5 = {
      media_link: newVideo.media_link,
      media_delay: newVideo.media_delay,
    }

    const items = [...steps];

    let item5 = {
      ...items[stepIndex],
      media_link: miniObj5.media_link,
      media_delay: miniObj5.media_delay,
    }

    items[stepIndex] = item5;

    setSteps(items);

    if (editVideo === false) {
      setNewVideo({ ...newVideo, media_link: null, media_delay: '0s' });
    } else if (editVideo === true) {
      setNewVideo({ ...newVideo, media_link: null, media_delay: '0s' });
    }

    setDisabled(true);
    handleVideoClose(true);
    setEditVideo(false);
  }

  const handleHeadSubmit = (event) => {

    event.preventDefault();
    const stepIndex = currentActionRow.step_id;

    let miniObj2 = {
      pan: !newHead.pan ? steps[stepIndex].pan : newHead.pan,
      pan_delay: !newHead.pan_delay ? steps[stepIndex].pan_delay : newHead.pan_delay,
      tilt: !newHead.tilt ? steps[stepIndex].tilt : newHead.tilt,
      tilt_delay: !newHead.tilt_delay ? steps[stepIndex].tilt_delay : newHead.tilt_delay
    }

    const items = [...steps];

    let item2 = {
      ...items[stepIndex],
      pan: miniObj2.pan,
      pan_delay: miniObj2.pan_delay,
      tilt: miniObj2.tilt,
      tilt_delay: miniObj2.tilt_delay,
    }

    items[stepIndex] = item2;

    setSteps(items);

    if (editHead === false) {
      setNewHead({ ...newHead, pan: 30, pan_delay: '0s', tilt: 30, tilt_delay: '0s' });
    } else if (editHead === true) {
      setNewHead({ ...newHead, pan: 30, pan_delay: '0s', tilt: 30, tilt_delay: '0s' });
    }

    setDisabled(true);
    handleHeadClose(true);
    setEditHead(false);
  }

  const handleMovementChange = ({ target }) => {
    console.log(target)
    const { name, value } = target;
    setNewMovement((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleMovementSubmit = (event) => {

    event.preventDefault();
    const stepIndex = currentActionRow.step_id;

    let miniObj = {
      location_delay: !newMovement.location_delay ? steps[stepIndex].location_delay : newMovement.location_delay,
      location_robot_id: null,
      location_name: !newMovement?.location_name ? steps[stepIndex]?.location_name : newMovement?.location_name,
    }

    const items = [...steps];

    let item = {
      ...items[stepIndex],
      location_delay: miniObj.location_delay,
      location_name: miniObj.location_name,
      location_robot_id: miniObj.location_robot_id,
    }

    items[stepIndex] = item;

    setSteps(items);

    if (editMovement === false) {
      setNewMovement({ ...newMovement, location_name: locationList[0], location_delay: '0s' });
    } else if (editMovement === true) {
      setNewMovement({ ...newMovement, location_name: locationList[0], location_delay: '0s' });
    }
    setDisabled(true);
    handleClose(true);
    console.log('edit true ', editMovement, newMovement)
    console.log('edit false', editMovement, newMovement)
    setEditMovement(false);
  }

  const handleBar = ({ target }) => {
    const { name, value } = target;
    console.log(value)

    setBarData({ ...barData, [name]: value });

  }

  const handleDisplayScreenText = (event, row) => {

    const rowIndex = steps.indexOf(row);

    console.log(rowIndex)

    let items = [...steps];

    const item = {
      ...items[rowIndex],
      [event.target.name]: event.target.checked === true ? 1 : 0
    }

    items[rowIndex] = item;

    setSteps(items);

  }

  const handleMustComplete = (event, row) => {
    // const { name, checked } = target;

    const rowIndex = steps.indexOf(row);

    console.log('MUST COMPELTE', rowIndex, event.target);


    let items = [...steps];

    const item = {
      ...items[rowIndex],
      [event.target.name]: event.target.checked === true ? 1 : 0
    }

    items[rowIndex] = item;

    setSteps(items);

  }

  useEffect(() => {
    steps.forEach(stepID => {
      if (
        stepID[steps.length - 1]?.location_name === null &&
        stepID[steps.length - 1]?.pan === null &&
        stepID[steps.length - 1]?.pan_delay === null &&
        stepID[steps.length - 1]?.tilt === null &&
        stepID[steps.length - 1]?.tilt_delay === null &&
        stepID[steps.length - 1]?.tts === null &&
        stepID[steps.length - 1]?.tts_delay === null &&
        stepID[steps.length - 1]?.media_link === null &&
        stepID[steps.length - 1]?.media_delay === null &&
        stepID[steps.length - 1]?.audio_link === null &&
        stepID[steps.length - 1]?.audio_delay === null) {
        setSteps(steps.filter((el) => steps.length - 1 !== steps.length - 1));
        if (steps[steps.length - 1].id !== null) {
          deleteStep(steps[steps.length - 1].id);
        }
      }
    });
    setIDNullValidator(false);
  }, [iDNullValidator === true]);

  const handleSaveSteps = () => {
    const data = {};
    data.behavior_id = behavior_id;
    data.behavior_name = behaviorDetails.behavior_name;
    data.behavior_description = behaviorDetails.behavior_description;
    data.behavior_image = behaviorDetails.behavior_image;
    data.start_from = barData.start_from;
    data.repeat_sequence = barData.repeat_sequence;
    data.robot_id = barData.robot_id;

    if (barData.robot_id === null) {
      alert('Choose Robot ID from Bottom Bar!');

    } else {
      //check for any step null or not
      console.log('Q/C ', steps.length - 1, steps[steps.length - 1]?.id);
      if (steps[steps.length - 1]?.location_name === null &&
        steps[steps.length - 1].tts === null &&
        steps[steps.length - 1].media_link === null &&
        steps[steps.length - 1].audio_link === null &&
        steps[steps.length - 1].pan === null &&
        steps[steps.length - 1].tilt === null) {
        setSteps(steps.filter((el) => steps.length - 1 !== steps.length - 1));
        if (steps[steps.length - 1].id !== null) {
          console.log('inside')
          deleteStep(steps[steps.length - 1].id);
        }
      }

      // steps.forEach(stepID => {
      //   if (
      //     stepID.location_name === null &&
      //     stepID.pan === null &&
      //     stepID.pan_delay === null &&
      //     stepID.tilt === null &&
      //     stepID.tilt_delay === null &&
      //     stepID.tts === null &&
      //     stepID.tts_delay === null &&
      //     stepID.media_link === null &&
      //     stepID.media_delay === null &&
      //     stepID.audio_link === null &&
      //     stepID.audio_delay === null) {
      //     setSteps(steps.filter((el) => indexOf(el) !== indexOf(stepID)));
      //     if (stepID.id !== null) {
      //       deleteStep(stepID.id);
      //     }
      //   }
      // });
      setIDNullValidator(true);
      //commented now 1.18
      // const items = [...steps];

      // items.map(item => {
      //   console.log(steps);
      //   setSteps({
      //     ...steps[item.step_id],
      //     step_id: item.step_id++
      //   })
      // })
      // console.log(items)
      // setSteps(items);

      const tempSteps = [];
      const idSteps = [];

      steps.forEach(step => {
        if (step.id === null) {
          tempSteps.push(step);
        } else if (step.id) {
          idSteps.push(step);
        }
      });

      console.log(tempSteps.length);
      console.log(idSteps.length);

      if (tempSteps.length > 0) {
        dispatch(behaviourStepsApi(tempSteps, behavior_id, barData.robot_id));
      }
      if (idSteps.length > 0) {
        dispatch(behaviourStepsUpdateApi(idSteps, behavior_id, barData.robot_id));
      }
      dispatch(behaviourUpdateApi(data, behavior_id));


      console.log('[BAR DATA]', barData);


      history.push('/behaviour');
    }
  }

  const updateImageUrl = (imageLink) => {
    setImageUrl(imageLink);
    // set
  }

  const backFunction = () => {
    if (steps.length === 0) {
      const data = {};

      data.behavior_id = behavior_id;
      data.behavior_name = behaviorDetails.behavior_name;
      data.behavior_description = behaviorDetails.behavior_description;
      data.behavior_image = behaviorDetails.behavior_image;
      data.start_from = barData.start_from;
      data.repeat_sequence = barData.repeat_sequence;
      data.robot_id = initialRobot.robot_id;

      dispatch(behaviourUpdateApi(data, behavior_id));
      history.push('/behaviour');
    } else {
      history.push('/behaviour');
    }
  }

  return (
    console.log("[DATA CHANGED]", steps),
    <>
      <Grid item xs={12} style={{ margin: '1em 0', padding: '2em 1em' }}>
        <Grid container>
          <Grid item xs={1}>
            <Button style={{ margin: '1.4em 0' }} startIcon={<img src={backicon} />} onClick={() => backFunction()} />
          </Grid>
          <Grid item xs={1}>
            {behaviorDetails.behavior_image ? (<img style={{ width: '4.4em', height: '4.4em', borderRadius: '0.5em', margin: '0 -0.6em' }} src={behaviorDetails?.behavior_image} height='50px' width='50px' />)
              : (<ImageIcon style={{ fontSize: '5em', margin: '0 ​0 0 -19px' }} />)
            }
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h4">
              {behaviorDetails?.behavior_name}
            </Typography>{" "}
            <Typography variant="h6" noWrap={true}>
              {behaviorDetails?.behavior_description}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              style={{ padding: '0.5em 1em' }}
              className={classes.buttonui}
              startIcon={<img src={editicon} />}
              onClick={() => {
                setEntryOpen(true);
                setBehaviorEdit(true);
              }}
            > Edit</Button>
          </Grid>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} style={{ width: '1em' }}></TableCell>
              <TableCell align="center" className={classes.tableCell}><img src={mapsm} style={{
                color: '#747C8B !important',
                width: '0.8em',
                margin: '0 4px',
                verticalAlign: 'sub'
              }} /> MOVEMENT</TableCell>
              <TableCell align="center" className={classes.tableCell}><img src={speaksm} style={{
                color: '#747C8B !important',
                width: '1.2em',
                margin: '0 4px',
                verticalAlign: 'unset'
              }} /> SPEAK</TableCell>
              <TableCell align="center" className={classes.tableCell}><img src={videosm} style={{
                color: '#747C8B !important',
                width: '1em',
                margin: '0 4px',
                verticalAlign: 'baseline'
              }} /> MEDIA</TableCell>
              <TableCell align="center" className={classes.tableCell}><img src={audiosm} style={{
                color: '#747C8B !important',
                width: '1em',
                margin: '0 4px',
                verticalAlign: 'revert'
              }} /> AUDIO</TableCell>
              <TableCell align="center" className={classes.tableCell}><img src={headsm} style={{
                color: '#747C8B !important',
                width: '1em',
                margin: '0 4px',
                verticalAlign: 'baseline'
              }} /> HEAD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading === false ? steps?.length > 0 && steps.map((row, index, array) =>
                <TableRow key="unique_0011">
                  <TableCell component="th" scope="row" style={{ color: '#747C8B !important' }}>
                    STEP {index + 1}
                    <Button onClick={handleSpecificDeleteRow(row)} style={{ color: 'red' }}><DeleteIcon /></Button>
                  </TableCell>
                  <TableCell align="center" className={classes.actions}>
                    {row?.location_name ? (<Card className={classes.root}>
                      <CardActionArea style={{
                        background: 'linear-gradient(181.59deg, #5ACBFF 0.19%, #3DB0FF 96.59%)',
                        color: 'white'
                      }}>
                        <CardContent style={{ background: 'linear-gradient(181.59deg, #5ACBFF 0.19%, #3DB0FF 96.59%)', color: 'color: #EAF6FF', height: '8.6em', padding: '11px 11px', width: '13em' }}>
                          <h6>
                            Go to <Button onClick={handleSpecificActionDelete(row, "movement")}>
                              <img src={deleteico}
                                style={{
                                  width: '1rem',
                                  margin: '0em 0em 0em 4em',
                                }} />
                            </Button>
                          </h6>
                          <Typography variant="body2" color="textSecondary" component="p" >
                            <Button className={classes.textField} style={{
                              background: 'inherit',
                              color: 'white',
                              boxShadow: '1px 1px 2px rgb(118 214 255 / 40%), inset -2px -2px 9px rgb(119 144 168 / 20%), inset 2px 2px 9px rgb(119 144 168 / 20%)',
                              margin: '4px',
                            }} onClick={rowSetter("movement", row, index, true)}>{row.location_name}</Button>
                          </Typography>
                          <Button size="small" color="primary" style={{
                            fontSize: '0.9em',
                            color: 'lightskyblue',
                            display: 'block'
                          }}>
                            Must Complete  &nbsp;
                            <input type="checkbox"
                              name="location_must_complete"
                              checked={row.location_must_complete === 1 ? true : false}
                              style={{
                                boxShadow: 'none',
                                boxShadow: 'none',
                                width: 'auto',
                                verticalAlign: 'middle'
                              }}
                              onChange={(event) => handleMustComplete(event, row)} />
                          </Button>
                        </CardContent>
                      </CardActionArea>
                    </Card>) : (
                      <div className={classes.actionCubic}>
                        <Button style={{
                          float: 'right',
                          margin: '-1em',
                        }}
                          onClick={rowSetter("movement", row, index, true)}>
                          <img src={actionadd} />
                        </Button>
                        <Button onClick={rowSetter("movement", row, index, false)}>
                          <img style={{
                            margin: '0 2em'
                          }} src={location} />
                        </Button>
                      </div>)}
                  </TableCell>
                  <TableCell align="center" className={classes.actions}>
                    {row?.tts ? (<Card className={classes.root}>
                      <CardActionArea style={{
                        background: 'linear-gradient(181.59deg, #5ACBFF 0.19%, #3DB0FF 96.59%)',
                        color: 'white'
                      }}>
                        <CardContent style={{ background: 'linear-gradient(181.59deg, #5ACBFF 0.19%, #3DB0FF 96.59%)', color: 'color: #EAF6FF', height: '8.6em', padding: '11px 11px', width: '13em' }}>
                          <h6>
                            Speak <Button onClick={handleSpecificActionDelete(row, "speak")}>
                              <img src={deleteico}
                                style={{
                                  width: '1rem',
                                  margin: '0em 0em 0em 4em',
                                }} />
                            </Button>
                          </h6>
                          <Typography variant="body2" color="textSecondary" component="p" >
                            <Button className={classes.textField} style={{
                              background: 'inherit',
                              color: 'white',
                              boxShadow: '1px 1px 2px rgb(118 214 255 / 40%), inset -2px -2px 9px rgb(119 144 168 / 20%), inset 2px 2px 9px rgb(119 144 168 / 20%)',
                              margin: '4px',
                            }} onClick={rowSetter("speak", row, true)}>{row?.tts?.length > 5 ? `${row.tts.substring(0, 11)}...` : row.tts}</Button>
                          </Typography>
                        </CardContent>
                      </CardActionArea>

                    </Card>) : (
                      <div className={classes.actionCubic}>
                        <Button style={{
                          float: 'right',
                          margin: '-1em',
                        }}
                          onClick={rowSetter("speak", row, true)}>
                          <img src={actionadd} />
                        </Button>
                        <Button onClick={rowSetter("speak", row)}>
                          <img style={{
                            margin: '0 2em'
                          }} src={speakicon} />
                        </Button>
                      </div>)}</TableCell>
                  <TableCell align="center" className={classes.actions}>
                    {row?.media_link ? (<Card className={classes.root}>
                      <CardActionArea style={{
                        background: 'linear-gradient(181.59deg, #5ACBFF 0.19%, #3DB0FF 96.59%)',
                        color: 'white'
                      }}>
                        <CardContent style={{ background: 'linear-gradient(181.59deg, #5ACBFF 0.19%, #3DB0FF 96.59%)', color: 'color: #EAF6FF', height: '8.6em', padding: '11px 11px', width: '13em' }}>
                          <h6>
                            Video Link<Button onClick={handleSpecificActionDelete(row, "video")}>
                              <img src={deleteico}
                                style={{
                                  width: '1rem',
                                  margin: '0em 0em 0em 2em',
                                }} />
                            </Button>
                          </h6>
                          <Typography variant="body2" color="textSecondary" component="p">
                            <Button className={classes.textField} style={{
                              background: 'inherit',
                              color: 'white',
                              boxShadow: '1px 1px 2px rgb(118 214 255 / 40%), inset -2px -2px 9px rgb(119 144 168 / 20%), inset 2px 2px 9px rgb(119 144 168 / 20%)',
                              margin: '4px',
                            }} onClick={rowSetter("video", row, true)}>
                              {row?.media_link?.length > 5 ? `${row.media_link.substring(0, 11)}...` : row?.media_link}
                              {!row.media_link && 'Media File'}
                            </Button>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>) : (
                      <div className={classes.actionCubic}>
                        <Button style={{
                          float: 'right',
                          margin: '-1em',
                        }}
                          onClick={rowSetter("video", row, true)}>
                          <img src={actionadd} />
                        </Button>
                        <Button onClick={rowSetter("video", row)}>
                          <img style={{
                            margin: '0 2em'
                          }} src={videoicon} />
                        </Button>
                      </div>)}
                  </TableCell>
                  <TableCell align="center" className={classes.actions}>
                    {row?.audio_link ? (<Card className={classes.root}>
                      <CardActionArea style={{
                        background: 'linear-gradient(181.59deg, #5ACBFF 0.19%, #3DB0FF 96.59%)',
                        color: 'white'
                      }}>
                        <CardContent style={{ background: 'linear-gradient(181.59deg, #5ACBFF 0.19%, #3DB0FF 96.59%)', color: 'color: #EAF6FF', height: '8.6em', padding: '11px 11px', width: '13em' }}>
                          <h6>
                            Audio Link<Button onClick={handleSpecificActionDelete(row, "audio")}>
                              <img src={deleteico}
                                style={{
                                  width: '1rem',
                                  margin: '0em 0em 0em 2em',
                                }} />
                            </Button>
                          </h6>
                          <Typography variant="body2" color="textSecondary" component="p">
                            <Button className={classes.textField} style={{
                              background: 'inherit',
                              color: 'white',
                              boxShadow: '1px 1px 2px rgb(118 214 255 / 40%), inset -2px -2px 9px rgb(119 144 168 / 20%), inset 2px 2px 9px rgb(119 144 168 / 20%)',
                              margin: '4px',
                            }} onClick={rowSetter("audio", row, true)}>{row?.audio_link?.length > 5 ? `${row.audio_link.substring(0, 11)}...` : row.audio_link}
                              {!row.audio_link && 'Audio File'}
                            </Button>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>) : (
                      <div className={classes.actionCubic}>
                        <Button style={{
                          float: 'right',
                          margin: '-1em',
                        }}
                          onClick={rowSetter("audio", row, true)}>
                          <img src={actionadd} />
                        </Button>
                        <Button onClick={rowSetter("audio", row)}>
                          <img style={{
                            margin: '0 2em'
                          }} src={audioicon} />
                        </Button>
                      </div>)}
                  </TableCell>
                  <TableCell align="center" className={classes.actions}>
                    {row?.pan || row?.tilt ? (<Card className={classes.root}>
                      <CardActionArea style={{
                        background: 'linear-gradient(181.59deg, #5ACBFF 0.19%, #3DB0FF 96.59%)',
                        color: 'white'
                      }}>
                        <CardContent style={{ background: 'linear-gradient(181.59deg, #5ACBFF 0.19%, #3DB0FF 96.59%)', color: 'color: #EAF6FF', height: '8.6em', padding: '11px 11px', width: '13em' }}>
                          <h6>
                            PAN - TILT <Button onClick={handleSpecificActionDelete(row, "head")}>
                              <img src={deleteico}
                                style={{
                                  width: '1rem',
                                  margin: '0em 0em 0em 2em',
                                }} />
                            </Button>
                          </h6>
                          <Typography variant="body2" color="textSecondary" component="p">
                            <Button className={classes.textField} style={{
                              background: 'inherit',
                              color: 'white',
                              boxShadow: '1px 1px 2px rgb(118 214 255 / 40%), inset -2px -2px 9px rgb(119 144 168 / 20%), inset 2px 2px 9px rgb(119 144 168 / 20%)',
                              margin: '4px',
                            }} onClick={rowSetter("head", row, true)}>
                              {row.pan}{row.pan ? '∡' : null} {row.tilt ? '-' : null} {row.tilt}{row.tilt ? '°' : null}
                            </Button>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>) : (
                      <div className={classes.actionCubic}>
                        <Button style={{
                          float: 'right',
                          margin: '-1em',
                        }}
                          onClick={rowSetter("head", row)}>
                          <img src={actionadd} />
                        </Button>
                        <Button onClick={rowSetter("head", row)}>
                          <img style={{
                            margin: '0 2em'
                          }} src={headicon} />
                        </Button>
                      </div>)}
                  </TableCell>
                </TableRow>
              ) : null
            }

          </TableBody>
        </Table>
        {steps?.length === 0 && <div style={{ textAlign: 'center', padding: '2em' }}>No Steps found!</div>}
        <br></br>
        <Button onClick={handleRow}
          disabled={
            // steps[steps.length - 1]?.location_robot_id === null &&
            steps[steps.length - 1]?.location_name === null &&
              steps[steps.length - 1].location_delay === '0s' &&
              steps[steps.length - 1].location_must_complete === false &&
              steps[steps.length - 1].tts === null &&
              steps[steps.length - 1].tts_on_screen_flag === false &&
              steps[steps.length - 1].tts_delay === null &&
              steps[steps.length - 1].media_link === null &&
              steps[steps.length - 1].media_delay === null &&
              steps[steps.length - 1].audio_link === null &&
              steps[steps.length - 1].audio_delay === null &&
              steps[steps.length - 1].pan === null &&
              steps[steps.length - 1].pan_delay === null &&
              steps[steps.length - 1].tilt === null &&
              steps[steps.length - 1].tilt_delay === null ? true : false
          }
          className={classes.buttonui}>+ Add step with actions</Button>
      </TableContainer>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar style={{
          color: '#747C8B',
          border: '2.5px solid #F2F9FF',
          padding: '1em 2em',
          background: '#EAF1F8',
          borderRadius: '1.5em'
        }}>
          <label style={{ margin: '0' }}>Start from: </label>
          <select
            className={classes.textField}
            name="start_from"
            labelId="start_from"
            id="start_from"
            value={barData.start_from || 'Start from 1'}
            disabled={
              steps.length > 0 &&
                // && steps[0]?.location_robot_id !== '' &&
                steps[0]?.location_name !== '' &&
                steps[0]?.location_delay !== '0s' &&
                steps[0]?.location_must_complete !== false &&
                steps[0]?.tts !== '' &&
                steps[0]?.tts_on_screen_flag !== false &&
                steps[0]?.tts_delay !== '' &&
                steps[0]?.media_link !== '' &&
                steps[0]?.media_delay !== '' &&
                steps[0]?.audio_link !== '' &&
                steps[0]?.audio_delay !== '' &&
                steps[0]?.pan !== '' &&
                steps[0]?.pan_delay !== '' &&
                steps[0]?.tilt !== '' &&
                steps[0]?.tilt_delay !== '' || steps.length === 0 ? true : false
            }
            onChange={handleBar}
            style={{
              width: '8.09em',
              padding: '7px 3px',
              margin: '0 0.5em'
            }}>
            {
              Object.keys(steps).map((step, indexVal1) => {
                indexVal1++;
                // indexval1Setter(step[0]);

                return <option value={'Start From ' + indexVal1}>{'Start From ' + indexVal1}</option>
              })
            }
          </select>

          <label style={{ margin: '0' }}>Repeat Sequence: </label>
          <select
            className={classes.textField}
            name="repeat_sequence"
            labelId="repeat_sequence"
            id="repeat_sequence"
            value={barData.repeat_sequence || 'No Repeat'}
            disabled={
              // steps.length > 0 && steps[0]?.location_robot_id !== '' &&
              steps[0]?.location_name !== '' &&
                steps[0]?.location_delay !== '0s' &&
                steps[0]?.location_must_complete !== false &&
                steps[0]?.tts !== '' &&
                steps[0]?.tts_on_screen_flag !== false &&
                steps[0]?.tts_delay !== '' &&
                steps[0]?.media_link !== '' &&
                steps[0]?.media_delay !== '' &&
                steps[0]?.audio_link !== '' &&
                steps[0]?.audio_delay !== '' &&
                steps[0]?.pan !== '' &&
                steps[0]?.pan_delay !== '' &&
                steps[0]?.tilt !== '' &&
                steps[0]?.tilt_delay !== '' || steps.length === 0 ? true : false
            }
            onChange={handleBar}
            style={{
              width: '9.09em',
              padding: '7px 4px',
              margin: '0 0.5em'
            }}>
            {
              Object.keys(rseqList).map((seq, index) => {
                return <option value={rseqList[seq]}>{rseqList[seq]}</option>
              })
            }
          </select>
          <label style={{ margin: '0' }}>Robot ID: </label>
          <select
            className={classes.textField}
            name="robot_id"
            labelId="robot_id"
            id="robot_id"
            value={barData.robot_id}
            onChange={handleBar}
            style={{
              width: '9em',
              padding: '7px 3px',
              margin: '0 0.5em'
            }}>
            <option selected value hidden disabled>Choose Robot</option>
            {
              Object.keys(robotList).map((robot, index) => {
                return <option value={robotList[robot].robot_id}>{robotList[robot].name}</option>
              })
            }
          </select>
          <Button
            className={classes.buttonui}
            disabled={
              steps[0]?.location_name === '' &&
                steps[0]?.location_delay === '0s' &&
                steps[0]?.location_must_complete === false &&
                steps[0]?.tts === '' &&
                steps[0]?.tts_on_screen_flag === false &&
                steps[0]?.tts_delay === '' &&
                steps[0]?.media_link === '' &&
                steps[0]?.media_delay === '' &&
                steps[0]?.audio_link === '' &&
                steps[0]?.audio_delay === '' &&
                steps[0]?.pan === '' &&
                steps[0]?.pan_delay === '' &&
                steps[0]?.tilt === '' &&
                steps[0]?.tilt_delay === '' ? true : false
            } onClick={handleSaveSteps}>
            SAVE
          </Button>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {actions.movement && <EditMovementBody
          rowID={rowID}
          onClose={handleClose}
          steps={steps}
          setSteps={setSteps}
          currentRow={currentActionRow}
          handleMovementChange={handleMovementChange}
          handleMovementSubmit={handleMovementSubmit}
          robots={robotList}
          locations={locationList}
          delay={delay}
          locationName={newMovement.location_name}
          locationDelay={newMovement.location_delay}
          locationRobot="null"
          editing={editMovement}
          reset={reset}
          setNewMovement={setNewMovement} />}
      </Modal>
      <Modal
        open={headOpen}
        onClose={handleHeadClose}
      >
        {actions.head && <EditHeadBody
          onClose={handleHeadClose}
          steps={steps}
          setSteps={setSteps}
          currentRow={currentActionRow}
          handleHeadChange={handleHeadChange}
          handleHeadSubmit={handleHeadSubmit}
          delay={delay}
          one={newHead.pan}
          tilt={tilt}
          pan={pan}
          two={newHead.pan_delay}
          three={newHead.tilt}
          four={newHead.tilt_delay}
          editing={editHead}
          reset={reset}
          setNewHead={setNewHead} />}
      </Modal>
      <Modal
        open={speakOpen}
        onClose={handleSpeakClose}
      >
        {actions.speak && <EditSpeakBody
          onClose={handleSpeakClose}
          steps={steps}
          setSteps={setSteps}
          currentRow={currentActionRow}
          handleSpeakChange={handleSpeakChange}
          handleSpeakSubmit={handleSpeakSubmit}
          handleDisplayScreenText={handleDisplayScreenText}
          delay={delay}
          one={newSpeak.tts}
          two={newSpeak.tts_on_screen_flag}
          three={newSpeak.tts_delay}
          editing={editSpeak}
          reset={reset}
          setNewSpeak={setNewSpeak} />}
      </Modal>
      <Modal
        open={audioOpen}
        onClose={handleAudioClose}
      >
        {actions.audio && <EditAudioBody
          onClose={handleAudioClose}
          steps={steps}
          currentRow={currentActionRow}
          handleAudioChange={handleAudioChange}
          handleAudioSubmit={handleAudioSubmit}
          setSteps={setSteps}
          delay={delay}
          one={newAudio.audio_link}
          two={newAudio.audio_delay}
          editing={editAudio}
          reset={reset}
          setNewAudio={setNewAudio} />}
      </Modal>
      <Modal
        open={videoOpen}
        onClose={handleVideoClose}
      >
        {actions.video && <EditVideoBody
          onClose={handleVideoClose}
          steps={steps}
          currentRow={currentActionRow}
          handleVideoChange={handleVideoChange}
          handleVideoSubmit={handleVideoSubmit}
          setSteps={setSteps}
          delay={delay}
          one={newVideo.media_link}
          two={newVideo.media_delay}
          editing={editVideo}
          reset={reset}
          setNewVideo={setNewVideo} />}
      </Modal>
      <Modal
        open={entryOpen}
        onClose={handleClose}
        disableEnforceFocus
      >
        {entryOpen && (
          <EntryBehaviourModal
            behavior_id={behavior_id}
            behavior_name={behaviorDetails.behavior_name}
            behavior_description={behaviorDetails.behavior_description}
            behavior_image={behaviorDetails.behavior_image}
            handleBehaviorChange={handleBehaviorChange}
            handleClose={handleBehaviourModalClose}
            handleBehaviorSubmit={handleBehaviorSubmit}
            updateImageUrl={updateImageUrl}
            behaviorDetails={behaviorDetails}
            setBehaviorDetails={setBehaviorDetails}
            behaviorEdit={behaviorEdit}
            setBehaviorEdit={setBehaviorEdit}
            setEntryOpen={setEntryOpen}
            setImage={setImage}
          />)}
      </Modal>
    </>
  )
};

export default AddEditBehaviour;
