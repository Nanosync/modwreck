import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Welcome extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <div>
                    <Button component={ Link } to="/settings" variant="contained" color="primary">
                        Setting
                    </Button>
                </div>
                <div>
                    <Button component={ Link } to="/game" variant="contained" color="primary">
                        Play
                    </Button>
                </div>
            </div>
        );
    }
}

export default Welcome;
