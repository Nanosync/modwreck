import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="just-centering">
                <h1 className="game-description"><b>Very Simple!</b></h1>
                <h1><b>Answer the questions as fast as you can!</b></h1>
                <div className="play-btn">
                    <Button component={ Link } to="/game" variant="contained" color="secondary" size="large" fullWidth={true}>
                        Play
                    </Button>
                </div>
                <div className="setting-btn">
                    <Button component={ Link } to="/settings" variant="contained" color="primary" size="large">
                        Setting
                    </Button>
                </div>


            </div>
        );
    }
}

export default Welcome;
