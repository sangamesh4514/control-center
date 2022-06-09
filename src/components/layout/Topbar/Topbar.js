import { Menu } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { Button, makeStyles, Grow, Popper } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Logo from './logo.svg';
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { aidoContext } from '../../../App';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        boxShadow: '0 0 0 rgb(0 0 0 / 0%)',
        width: '100%',
        backdropFilter: 'blur(5px)',
        webkitBackdropFilter: 'blur(5px)',
        zIndex: 6,
        top: '1px',
        padding: '1.5em 2em 1.5em 2em',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function Topbar() {
    const userId = localStorage.getItem("userId");
    const userToken = localStorage.getItem("userToken");

    const { aidoState, setAidoState } = useContext(aidoContext);

    const [userProfile, setUserProfile] = useState({
        name: null, image: aidoState
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const history = useHistory();
    const classes = useStyles();


    /**
     * Represents Logout Module
     * @module {function} Logout 
     */
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
        history.push('/login');
    }

    useEffect(() => {
        setUserProfile({ image: aidoState });
    }, [aidoState]);

    useEffect(async () => {
        await axios.get(`https://ingendynamics.com/api/v1/user?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            .then(res => {
                console.log("res", res);
                if (res.data !== []) {
                    setUserProfile({ name: res?.data?.data[0]?.name, image: res?.data?.data[0]?.profile_url });
                    localStorage.setItem("username", res?.data?.data[0]?.name);
                } else {
                    alert("There's issue with server. Kindly contact ingen dynamics.")
                }

            });
    }, []);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    return (
        console.log('[DATA CHANGED]', aidoState, setAidoState),
        <>
            <div className={classes.root}>
                <a onClick={() => history.push('/')}>
                    <img src={Logo} />
                </a>
                {/* <Button
                    style={{
                        background: '#EAF1F8',
                        border: '2px solid rgba(255, 255, 255, 0.5)',
                        float: 'right',
                        borderRadius: '2em',
                        fontSize: '13px',
                        float: 'right',
                        fontWeight: '500',
                        boxShadow: 'inset 6px 5px 7px 1.5px rgb(204 216 236/0.2), inset -5px -5px 2px rgb(255 255 255/0%)'
                    }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    {userProfile.image ? <Avatar style={{ margin: '0 6px', border: '2px solid #FFFFFF' }} src={userProfile.image} /> : <Avatar style={{ margin: '0 6px', border: '2px solid #FFFFFF' }} src="https://material-ui.com/static/images/avatar/2.jpg" />}
                    <span style={{
                        fontSize: '13px',
                        color: '#747C8B'
                    }}>{userProfile.name}</span>
                </Button> */}
                <Button
                    style={{
                        background: '#EAF1F8',
                        border: '2px solid rgba(255, 255, 255, 0.5)',
                        float: 'right',
                        borderRadius: '2em',
                        fontSize: '13px',
                        float: 'right',
                        fontWeight: '500',
                        boxShadow: 'inset 6px 5px 7px 1.5px rgb(204 216 236/0.2), inset -5px -5px 2px rgb(255 255 255/0%)'
                    }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >{userProfile.image ? <Avatar style={{ margin: '0 6px', border: '2px solid #FFFFFF' }} src={userProfile.image} /> : <Avatar style={{ margin: '0 6px', border: '2px solid #FFFFFF' }} src="https://material-ui.com/static/images/avatar/2.jpg" />}
                    <span style={{
                        fontSize: '13px',
                        color: '#747C8B'
                    }}>{userProfile.name}</span>
                </Button>
                {/* <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                // onClose={handleClose}
                >
                    <MenuItem onClick={() => history.push('/profile')}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu> */}
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper style={{
                                background: 'transparent',
                                position: 'absolute',
                                right: '-121px',
                                width: '12em',
                                top: '1px',
                                boxShadow: 'none',
                                borderBottomRightRadius: '2em',
                                borderBottomLeftRadius: '1em',
                            }}   >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList style={{
                                        boxShadow: 'rgb(204 216 236/20%) 6px 5px 7px 1.5px inset, rgb(255 255 255/0%) -5px -5px 2px inset',
                                        background: 'rgb(234, 241, 248)',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        width: '11.6em',
                                        borderBottomRightRadius: '2em',
                                        borderBottomLeftRadius: '2em',
                                        border: '1px solid white',
                                        color: 'rgb(116, 124, 139)'
                                    }} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={() => history.push('/profile')}>
                                            <EmojiPeopleRoundedIcon style={{ margin: '0 0.4em', fontSize: '1em' }} /> My account</MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <ExitToAppRoundedIcon style={{ margin: '0 0.4em', fontSize: '1em' }} /> Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                {/* <Button color="inherit" onClick={() => handleLogout()}>
                            Logout
                        </Button> */}

            </div>
        </>
    );
}
