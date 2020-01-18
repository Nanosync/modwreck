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
        this.state = {
            minutes: this.props.minutes || 3,
            seconds: this.props.seconds || 0,
        }
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
                    this.props.onTimeout()
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