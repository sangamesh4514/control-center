import React from 'react';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const Loader = (props) => {

    return (
        <>
            <span style={{ fontSize: '1.4em', margin: '4em' }}>
                <AutorenewIcon /> Loading {props.module === 'steps' ? 'Steps' : 'Data'}
            </span>
        </>
    )
}

export default Loader;