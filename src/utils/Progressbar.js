import { React } from 'react';

const Progressbar = ({ value, styling, barStyle }) => {
    console.log('[PROGRESS BAR]');
    return (
        <>
            <div style={styling}>
                <progress
                    max={'100'}
                    value={value}
                    style={barStyle}>{value}</progress>
            </div>
        </>
    )
}

export default Progressbar;