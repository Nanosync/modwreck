import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

class GameOver extends React.Component {
    renderQuestion(questionSet, answers) {
        if (questionSet === null) {
            return <p>You did not answer any questions.</p>;
        }

        console.log(answers);

        return (questionSet.map((i, index) => (
            <ExpansionPanel>
                <ExpansionPanelSummary>({answers[index] ? <strong>Correct</strong> : <strong>Wrong</strong>}) {index + 1}. {i.moduleCode} {i.title}</ExpansionPanelSummary>
                <ExpansionPanelDetails><p className="text-left">{i.description}</p></ExpansionPanelDetails>
            </ExpansionPanel>
        )));
    }

    render() {
        return (
            <div className="white-background">
                <br />
                <h1>Game over</h1>
                <h2>Score: {this.props.score}</h2>
                <h2>Time: {this.props.timeTaken.toFixed(2)} seconds</h2>
                <p>Answers: </p>
                {this.renderQuestion(this.props.questionSet, this.props.answers)}
                <div className="play-btn">
                    <Button component={Link} to="/game" variant="contained" color="secondary" size="large" fullWidth onClick={() => this.props.playAgain()}>
                        Play Again
                    </Button>
                </div>
                <div className="setting-btn">
                    <Button component={Link} to="/" variant="contained" color="primary" size="large">
                        Home
                    </Button>
                </div>
            </div>
        )
    }
}

export default GameOver;
