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
            minutes: 3,
            seconds: 0,
            onTimeout: this.nullOnTimeout,
        }
    }

    nullOnTimeout = () => {

    }

    startTimer = () => {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

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
    componentDidMount() {
        var newState = {
            minutes: 3,
            seconds: 0,
            onTimeout: this.props.onTimeout
        }

        if (this.props.minutes === 0) {
            newState.minutes = 0
        } else if (this.props.minutes) {
            newState.minutes = this.props.minutes
        }

        if (this.props.seconds === 0) {
            newState.seconds = 0
        } else if (this.props.seconds) {
            newState.seconds = this.props.seconds
        }

        if (this.props.onTimeout) {
            newState.onTimeout = this.props.onTimeout
        }

        this.setState(newState, () => this.startTimer())
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div className='timer'>
                {minutes === 0 && seconds === 0 ? <h1>Busted!</h1>
                    : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
        )
    }
}

export default Timer