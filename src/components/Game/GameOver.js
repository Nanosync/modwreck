
import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    greenBackGround: {
        background: 'linear-gradient(45deg, #90ee90 30%, white 90%)',
    },
    redBackGround: {
        background: 'linear-gradient(45deg, white 30%, #ed2939 90%)'
    }
};

class GameOver extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className="white-background">
                <br />
                <h1>Game over</h1>
                <h2>Score: {this.props.score}</h2>
                <h2>Time: {this.props.timeTaken}</h2>
                <p>Answers: </p>
                {this.props.questionSet ?
                    this.props.questionSet.map((i, index) => <ExpansionPanel className={classes.redBackGround}>
                        <ExpansionPanelSummary>{index + 1}. {i.moduleCode} {i.title}</ExpansionPanelSummary>
                        <ExpansionPanelDetails><p className="text-left">{i.description}</p></ExpansionPanelDetails>
                    </ExpansionPanel>)
                    : <p>You did not answer anything!</p>
                }
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

export default withStyles(styles)(GameOver);