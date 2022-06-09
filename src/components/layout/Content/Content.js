import React from 'react';
import { Container } from '@material-ui/core';
import { Route, Redirect } from 'react-router-dom';
import Contacts from '../../contacts/Contacts';
import Behaviour from '../../BehaviourEditor/Behaviour';
import AddEditBehaviour from '../../BehaviourEditor/AddEditBehaviour/AddEditBehaviour';
import VideoCall from '../../call/VideoCall';
import Dashboard from '../../dashboard/Dashboard';
import RobotCustomization from '../../robot customization/RobotCustomization';
import HomeScreen from '../../robot customization/HomeScreen';
import GeneralSettings from './../../robot customization/GeneralSettings'
import NavigationSettings from './../../robot customization/NavigationSettings'
import BehaviourScheduler from '../../robot customization/BehaviourScheduler';
import CustomScreen from '../../robot customization/CustomScreen';
import Map from '../../Map/Map';
import Profile from '../../Profile/Profile';
import BehaviourSensors from '../../robot customization/BehaviourSensors';
import BehaviourDeepLearning from '../../robot customization/BehaviourDeepLearning';
import BehaviourProjection from '../../robot customization/BehaviourProjection';
import AlertEngine from '../../AlertEngine/AlertEngine';
import AddAlert from '../../AlertEngine/AddAlert';
import Notifications from '../../Notifications/Notifications.js';
import Topbar from '../Topbar/Topbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import FaceTraining from '../../FaceTraining/FaceTraining';
import NotFound from "../../NotFound";

const Content = () => {
    const user = localStorage.getItem('userToken');
    console.log('[Content.JS]', user);
    return (
        <>
                {/* <Route render={(props) => { */}
                <SideDrawer />
                <Topbar />
                <div style={{ margin: '7.6em 2em 0px 17em' }}>
                    {
                        user === null ? <Redirect to="/" /> : <Container>
                            <Route path="/" exact
                                render={() => user === null ? <Redirect to="/" /> : <Dashboard />} />
                            <Route path="/profile" exact
                                render={() => user === null ? <Redirect to="/" /> : <Profile />} />
                            <Route path="/dashboard" exact
                                render={() => user === null ? <Redirect to="/" /> : <Dashboard />} />
                            <Route path="/contacts" exact
                                render={() => user === null ? <Redirect to="/" /> : <Contacts />} />
                            <Route path="/behaviour" exact
                                render={() => user === null ? <Redirect to="/" /> : <Behaviour />} />
                            <Route path="/behaviour/add" exact
                                render={() => user === null ? <Redirect to="/" /> : <AddEditBehaviour />} />
                            <Route path="/calls" exact
                                render={() => user === null ? <Redirect to="/" /> : <VideoCall />} />
                            <Route path="/map" exact
                                render={() => user === null ? <Redirect to="/" /> : <Map />} />
                            <Route path="/customization" exact
                                render={() => user === null ? <Redirect to="/" /> : <RobotCustomization />} />
                            <Route path="/customization/homescreen" exact
                                render={() => user === null ? <Redirect to="/" /> : <HomeScreen />} />
                            <Route path="/customization/homescreen/custom" exact
                                render={() => user === null ? <Redirect to="/" /> : <CustomScreen />} />
                            <Route path="/customization/general/settings" exact
                                render={() => user === null ? <Redirect to="/" /> : <GeneralSettings />} />
                            <Route path="/customization/navigation/settings" exact
                                render={() => user === null ? <Redirect to="/" /> : <NavigationSettings />} />
                            <Route path="/customization/behaviour/schedulers" exact
                                render={() => user === null ? <Redirect to="/" /> : <BehaviourScheduler />} />
                            <Route path="/customization/sensors/settings" exact
                                render={() => user === null ? <Redirect to="/" /> : <BehaviourSensors />} />
                            <Route path="/customization/deep-learning/settings" exact
                                render={() => user === null ? <Redirect to="/" /> : <BehaviourDeepLearning />} />
                            <Route path="/customization/projector/settings" exact
                                render={() => user === null ? <Redirect to="/" /> : <BehaviourProjection />} />
                            <Route path="/alert" exact
                                render={() => user === null ? <Redirect to="/" /> : <AlertEngine />} />
                            <Route path="/alert/add" exact
                                render={() => user === null ? <Redirect to="/" /> : <AddAlert />} />
                            <Route
                                path="/notifications"
                                exact
                                render={() => user === null ? <Redirect to="/" /> : <Notifications />} />
                            <Route
                                path="/face-training"
                                exact
                                render={() => user === null ? <Redirect to="/" /> : <FaceTraining />} />

                            {/* <Route exact path="/*" component={NotFound} /> */}
                        </Container>
                    }

                </div>
        </>
    );
}

export default Content;
