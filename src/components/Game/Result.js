import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Result = ({ score, playAgain }) => (
    <div className="score-board">
        <div className="score">You scored {score} / 5 correct answers!</div>
        {/* <Button className="playBtn" onClick={playAgain}>Play again!</Button>
        <Button className="playBtn" onClick={playAgain}>Play again!</Button> */}

        <div className="spinner-container">
            <div className="playBtn">
                <Button variant="contained" color="secondary" onClick={playAgain}>
                    Play Again
            </Button>
            </div>
            <div className="homeBtn">
                <Button component={Link} to="/" variant="contained" color="primary">
                    Home
            </Button>
            </div>
        </div>
        {/* <Link to="/" className="homeBtn">Home</Link> */}
    </div>
)

export default withRouter(Result);
