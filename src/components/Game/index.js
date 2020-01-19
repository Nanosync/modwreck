import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import QuestionBox from "./QuestionBox";
import Result from "./Result";
import Timer from './Timer';
import GameOver from './GameOver'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './game.css';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { getQuestions } from '../../redux/actions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
        fontWeight: 'bold',
    },
};


class Game extends Component {
    constructor(props) {
        super(props);
        console.log("current", new Date().getTime() / 1000)
        this.state = {
            score: 0,
            responses: 0,
            showResult: false,
            exitGame: false,
            questionSet: null,
            question: 0,
            feedback: "Answer as fast as you can!",
            answers: [],
            startTime: new Date().getTime() / 1000,
            endTime: new Date().getTime() / 1000,
        };
    }

    computeAnswer = (questions, answer, correctAnswer) => {
        let result = false;
        if (answer.moduleCode === correctAnswer) {
            result = true;
            this.setState((prevState, props) => ({
                score: prevState.score + 1,
                feedback: "Fantastic!",
            }));
        } else {
            this.setState({
                feedback: "That wasn't correct...",
            });
        }
        this.setState((prevState, props) => ({
            questionSet: questions,
            responses: prevState.responses < this.props.numberOfQuestions ? prevState.responses + 1 : this.props.numberOfQuestions,
            answers: [...prevState.answers, answer]
        }));

        return result;
    };

    playAgain = () => {
        const { settings } = this.props;
        //condition fails during render
        window.scrollTo(0, 0);
        this.setState({
            score: 0,
            responses: 0,
            showResult: false,
            questionSet: null,
            question: 0,
            feedback: "Answer as fast as you can!",
            answers: [],
            startTime: new Date().getTime() / 1000
        });
    };


    exitGame = () => {
        //condition fails during render
        window.scrollTo(0, 0);
        this.setState({
            score: 0,
            responses: 0,
            showResult: false,
            exitGame:true,
            questionSet: null,
            question: 0,
            feedback: "Answer as fast as you can!",
            answers: [],
            startTime: new Date().getTime() / 1000
        });
    };

    componentDidMount() {
        if (this.props.questions && this.props.questions.length === 0) {
            this.props.getQuestions();
        }
    }

    handleTimeout = () => {
        this.setState({
            showResult: true,
            endTime: new Date().getTime() / 1000
        })
    }

    getQuestionSet() {
        const { settings, questions } = this.props;
        const { numberOfQuestions } = settings;

        if (questions === null || questions.length === 0) {
            return null;
        }

        console.log("Question set called", questions);

        // Copy array and filter it
        let array = questions.data
            .slice(0, questions.data.length)
            .filter(i => i.description.trim() !== "" && !i.moduleCode.endsWith("R"))
            .filter(i => i.faculty.includes(settings.category) || settings.category === "All");

        // Shuffle array
        const shuffled = array.sort(() => 0.5 - Math.random());

        // Get sub-array of first n elements after shuffled
        const questionSet = shuffled.slice(0, numberOfQuestions);

        //console.log(questionSet);

        return questionSet;
    }

    handleClick(e, questions, answer) {
        e.preventDefault();
        const userInputValue = e.currentTarget.value;

        let result = this.computeAnswer(questions, questions.filter(item => item.moduleCode === userInputValue)[0], answer);

        if (this.state.question === this.props.numberOfQuestions - 1) {
            this.setState({
                showResult: true,
                endTime: new Date().getTime() / 1000
            });
            return;
        }

        this.setState((prevState, props) => ({
            question: prevState.question + 1
        }));
        console.log("Result was", result);
    }
    showGameOver(classes) {
        return (
        <div className="white-background">
            <br />
            <h1>Game over</h1>
            <h2>Score: {this.state.score}</h2>
            <h2>Time: {new Date().getTime()/1000 - this.state.startTime}</h2>
            <p>Answers: </p>
            {this.state.questionSet ?
                this.state.questionSet.map((i, index) => <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}><div>{index + 1}. {i.moduleCode} {i.title}</div></ExpansionPanelSummary>
                    <ExpansionPanelDetails><div><p className="text-left">{i.description}</p></div></ExpansionPanelDetails>
                </ExpansionPanel>)
                : <p>You did not answer anything!</p>
            }
            <div className="play-btn">
                <Button component={Link} to="/game" variant="contained" color="secondary" size="large" fullWidth onClick={() => this.playAgain()}>
                    Play Again
                    </Button>
            </div>
            <div className="setting-btn">
                <Button component={Link} to="/" variant="contained" color="primary" size="large">
                    Home
                    </Button>
            </div>
        </div>
        );
    }

    render() {
        const { questions, classes } = this.props;

        if (questions.length === 0) {
            return <div className="loading-design">Loading...</div>;
        }

        if (this.state.question >= this.props.settings.numberOfQuestions || this.state.showResult || this.state.exitGame) {
            return <GameOver 
                score={this.state.score} 
                timeTaken={new Date().getTime() / 1000 - this.state.startTime} 
                questionSet={this.state.questionSet} 
                playAgain={this.playAgain}
                answers={this.state.answers}
                />
        }

        const questionSet = this.state.questionSet === null ? this.getQuestionSet() : this.state.questionSet;
        const question = questionSet[this.state.question];

        console.log(question);

        const answers = [];
        answers.push(question);

        let arr = questionSet.slice(0, questionSet.length);
        const shuffled = arr.sort(() => 0.5 - Math.random());

        let i = -1;
        while (answers.length < 4) {
            i++;

            if (i >= shuffled.length) {
                break;
            }

            if (shuffled[i].moduleCode === question.moduleCode) {
                continue;
            }

            answers.push(shuffled[i]);
        }

        answers.sort(() => 0.5 - Math.random());
        console.log(answers);

        let feedbackClasses = "feedback-text";
        if (this.state.feedback === "Fantastic!") {
            feedbackClasses += " positive-shadow";
        } else if (this.state.feedback === "That wasn't correct...") {
            feedbackClasses += " negative-shadow";
        }

        return (
            <div className="white-background">
                <div className="question-container">
                    <Grid
                        container
                        direction="row">
                            <Grid item xs={3} className="question"></Grid>
                            <Grid item xs={6} className="question">
                                <p className={feedbackClasses}>{this.state.feedback}</p>
                                <hr />
                                <p className="question-text">{question.description.substring(0, question.description.indexOf('.') + 1)}</p>

                            </Grid>
                            <Grid item xs={3} className="question">
                            <CountdownCircleTimer
                                // isLinearGradient={true}
                                size={80}
                                isPlaying
                                durationSeconds={this.props.settings.time * 60}
                                colors={[
                                    ['#00ff00', .33],
                                    ['#F7B801', .33],
                                    ['#ff0000']
                                ]}
                                renderTime={(remainingTime) => {
                                    return (
                                        <div>
                                            {remainingTime}
                                        </div>
                                    )
                                }}
                                onComplete={this.handleTimeout}
                            />
                            <p>{this.state.question} / {questionSet.length} answered</p>
                            </Grid>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="make-it-smaller">
                                <Button className={classes.root} size="large" variant="contained" fullWidth value={answers[0].moduleCode} onClick={e => this.handleClick(e, questionSet, question.moduleCode)}>A) {answers[0].moduleCode} {answers[0].title}</Button>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="make-it-smaller">
                                <Button size="large" variant="contained" className={classes.root} fullWidth value={answers[1].moduleCode} onClick={e => this.handleClick(e, questionSet, question.moduleCode)}>B) {answers[1].moduleCode} {answers[1].title}</Button>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="make-it-smaller">
                                <Button size="large" variant="contained" className={classes.root} fullWidth value={answers[2].moduleCode} onClick={e => this.handleClick(e, questionSet, question.moduleCode)}>C) {answers[2].moduleCode} {answers[2].title}</Button>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="make-it-smaller">
                                <Button size="large" variant="contained" className={classes.root} fullWidth value={answers[3].moduleCode} onClick={e => this.handleClick(e, questionSet, question.moduleCode)}>D) {answers[3].moduleCode} {answers[3].title}</Button>
                            </div>
                        </Grid>
                    </Grid>
                    <div className="play-btn">
                        <Button component={Link} to="/" variant="contained" color="secondary" size="large" fullWidth onClick={() => this.exitGame()}>
                            Exit Game
                        </Button>
                    </div>
                </div>
            </div>

        );

    }
}

const mapStateToProps = (state, ownProps) => ({
    settings: state.settings,
    questions: state.questions
});

export default withStyles(styles)( connect(mapStateToProps, { getQuestions })(Game));
