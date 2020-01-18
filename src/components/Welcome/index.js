import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { SwappingSquaresSpinner } from 'react-epic-spinners';


class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="setting-btn">
                    <Button component={Link} to="/settings" variant="contained" color="primary">
                        Setting
                    </Button>
                </div>
                <div className="play-btn">
                    <Button component={Link} to="/game" variant="contained" color="secondary">
                        Play
                    </Button>
                </div>
            </div>
        );
    }
}

export default Welcome;
