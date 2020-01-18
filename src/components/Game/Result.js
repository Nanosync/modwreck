import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Result = ({ score, playAgain }) => (
    <div className="score-board">
        <div className="score">
            <div>You scored {score} / 5 correct answers!</div>
            <div className="play-btn">
                <Button variant="contained" color="secondary" onClick={playAgain} fullWidth>
                    Play Again
                </Button>
            </div>
            <div>
                <Button component={Link} to="/" variant="contained" color="primary">
                    Home
                </Button>
            </div>
        </div>
    </div>
)

export default withRouter(Result);
