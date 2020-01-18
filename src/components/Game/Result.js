import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const Result = ({ score, playAgain }) => (
    <div className="score-board">
        <div className="score">You scored {score} / 5 correct answers!</div>
        <button className="playBtn" onClick={playAgain}>Play again!</button>
        <Link to="/">Home</Link>
    </div>
)

export default withRouter(Result);
