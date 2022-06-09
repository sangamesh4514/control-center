import React from 'react';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import SettingsInputSvideoIcon from '@material-ui/icons/SettingsInputSvideo';
import ExploreIcon from '@material-ui/icons/Explore';
import Classes from "./SideDrawer.module.css";
import { NavLink } from 'react-router-dom';
import vector from './Vector.svg';
import aidoicon from './Group139.png'; //aido
import videoicon from './Group140.svg'; //video
import behavioricon from './Group141.svg'; //behavior
import mapicon from './map_ico.svg';
import contactsicon from './contacts_ico.svg';
import notificationsicon from './notifications_ico.svg';
import alerticon from './alert.svg';
import facetrainingicon from './Group.svg';

export default function SideDrawer() {

    return (
        <>
            <div className={Classes.root}>
                <NavLink className={Classes.anchor} activeClassName={Classes.active} to='/dashboard'>
                    {/* <span style={{ height: '1em', width: '1em' }}> */}
                    <img className={Classes.icons} src={aidoicon} />
                    {/* </span> */}
                    My Aido
                </NavLink>
                <NavLink className={Classes.anchor} activeClassName={Classes.active} to='/calls'>
                    <img className={Classes.icons} src={videoicon} />
                    Calls</NavLink>
                <NavLink className={Classes.anchor} activeClassName={Classes.active} to='/behaviour'>
                    <img className={Classes.icons} src={behavioricon} />
                    Behavior</NavLink>
                <NavLink className={Classes.anchor} activeClassName={Classes.active} to='/map'>
                    <img className={Classes.icons} src={mapicon} />
                    Map</NavLink>
                <NavLink className={Classes.anchor} activeClassName={Classes.active} to='/contacts'>
                    <img className={Classes.icons} src={contactsicon} />
                    Contacts</NavLink>
                <NavLink className={Classes.anchor} activeClassName={Classes.active} to='/alert'>
                    <img className={Classes.icons} src={alerticon} />
                    Alert</NavLink>
                <NavLink className={Classes.anchor} activeClassName={Classes.active} to='/notifications'>
                    <img className={Classes.icons} src={notificationsicon} />
                    Notifications</NavLink>
                <NavLink className={Classes.anchor} activeClassName={Classes.active} to='/face-training'>
                    <img className={Classes.icons} style={{ padding: '4px' }} src={facetrainingicon} />
                    Face Training</NavLink>
            </div>
        </>
    );
}
