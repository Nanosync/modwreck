
import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import './game.css';

const styles = {
    greenBackGround: {
        background: 'linear-gradient(45deg, white 30%, #90ee90 90%)',
    },
    redBackGround: {
        background: 'linear-gradient(45deg, white 30%, #ed2939 90%)'
    },
    scoreBackGround: {
        background: 'linear-gradient(45deg, #90ee90 30%, #ed2939 90%)',
        borderRadius: '20px'
    }
};

class GameOver extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disableButtton: false,
            nameInput: "",
        };
    }
    handleChange = (e) => {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({
            [nam]: val
        });
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            disableButtton: true
        });
        console.log("UPLOAD ME PLZ");
        console.log(this.state.nameInput, this.props.score * 100 / this.props.timeTaken);
        // do some thing online
    }

    renderQuestion(questionSet, answers, classes) {
        if (questionSet === null) {
            return <p>You did not answer any questions.</p>;
        }

        console.log(answers);

        return (questionSet.map((i, index) => {
            let answerMod = "";
            let invalidAnswer = false;
            if (index >= answers.length) {
                invalidAnswer = true;
            } else {
                answerMod = answers[index].moduleCode;
            }
            
            return answerMod === i.moduleCode ? (<ExpansionPanel>
                <ExpansionPanelSummary className={classes.greenBackGround}><strong>(Correct)</strong>&nbsp;{index + 1}. {answers[index].moduleCode} {answers[index].title}</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <p className="text-left">
                        <strong>You answered this question correctly.</strong>
                        <br /><br />
                        {i.description}
                    </p>
                </ExpansionPanelDetails>
            </ExpansionPanel>) : (<ExpansionPanel>
                <ExpansionPanelSummary className={classes.redBackGround}>
                    <strong>(Wrong)</strong>&nbsp;{index + 1}. {invalidAnswer ? "Did not answer" : (answers[index].moduleCode + " " + answers[index].title)}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <p className="text-left">
                        <strong>You answered this question incorrectly.</strong>
                        <br /><br />
                        The correct answer was: <strong>{i.moduleCode} {i.title}.</strong>
                        <br /><br />
                        {i.description}</p>
                </ExpansionPanelDetails>
            </ExpansionPanel>);
        }
        )
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="white-background space-top">
                <div className="question-container">
                    <h1 className="feedback-text game-over-text">Game Over!</h1>

                    <div className="score-panel-container">
                        <Card className={classes.scoreBackGround}>
                            <h2>Correct Answers: {this.props.score}</h2>
                            <h2>Time Taken: {this.props.timeTaken.toFixed(2)} seconds</h2>
                            <h2>Final Score: {(this.props.score * 100 / this.props.timeTaken).toFixed(2)}</h2>
                        </Card>
                    </div>
                    {/*<form onSubmit={this.handleSubmit} >
                        <input type="text" onChange={this.handleChange} name="nameInput" value={this.state.nameInput} placeholder="Name" autoComplete="off" disabled={this.state.disableButtton} />
                        <input type="submit" disabled={this.state.disableButtton} />
                    </form>*/}
                    <h3>Your Answers: </h3>
                    {this.renderQuestion(this.props.questionSet, this.props.answers, classes)}

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
            </div>
        )
    }
}

export default withStyles(styles)(GameOver);
