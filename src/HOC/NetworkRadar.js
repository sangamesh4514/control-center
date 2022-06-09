import React, { Component } from 'react';

export default function (ComposedComponent) {
    class NetworkRadar extends Component {
        state = {
            isDisconnected: false
        }

        componentDidMount() {
            this.handleConnectionChange();
            window.addEventListener('online', this.handleConnectionChange);
            window.addEventListener('offline', this.handleConnectionChange);
        }

        componentWillUnmount() {
            window.removeEventListener('online', this.handleConnectionChange);
            window.removeEventListener('offline', this.handleConnectionChange);
        }


        handleConnectionChange = () => {
            const condition = navigator.onLine ? 'online' : 'offline';
            if (condition === 'online') {
                const webPing = setInterval(
                    () => {
                        fetch('//google.com', {
                            mode: 'no-cors',
                        })
                            .then(() => {
                                this.setState({ isDisconnected: false }, () => {
                                    return clearInterval(webPing)
                                });
                            }).catch(() => this.setState({ isDisconnected: true }))
                    }, 2000);
                return;
            }

            return this.setState({ isDisconnected: true });
        }

        render() {
            const { isDisconnected } = this.state;
            return (
                <div>
                    { isDisconnected && (<div style={{
                        height: '2em',
                        background: 'black',
                        borderBottom: '6px solid white',
                        textAlign: 'center',
                        color: 'aliceblue',
                        fontSize: '4em'
                    }}>
                    <p> &#9888; No Internet Connection. Try to reconnect!</p>
                </div>)
        }
                    <ComposedComponent {...this.props} />
                </div >
            );
}
    }

return NetworkRadar;
}