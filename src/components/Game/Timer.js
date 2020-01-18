import React from 'react';

class Timer extends React.Component {
    /*
        props:
            minutes
            seconds
            onTimeout
    */
    constructor(props) {
        super(props);
        // || to show default values incase it is empty
        this.state = {
            minutes: this.props.minutes || this.props.minutes == 0 ? 0 : 3,
            seconds: this.props.seconds || 0,
            onTimeout: this.props.onTimeout || this.nullOnTimeout,
        }
    }

    nullOnTimeout = () => {

    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const {seconds, minutes} = this.state

            if (seconds > 0) {
                this.setState({
                    seconds: seconds - 1
                })
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                    this.state.onTimeout()
                } else {
                    this.setState({
                        minutes: minutes - 1,
                        seconds: 59
                    })
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div className='timer'>
                { minutes === 0 && seconds === 0 ? <h1>Busted!</h1>
                    : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
        )
    }
}

export default Timer