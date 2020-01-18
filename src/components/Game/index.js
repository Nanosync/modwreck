import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import QuestionBox from "./QuestionBox";
import Result from "./Result";
import Timer from './Timer';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './game.css';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { getQuestions } from '../../redux/actions';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const styles = theme => ({
        correctPanel : {
            backgroundColor : theme.palette.success
        }
    }

)

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            responses: 0,
            showResult: false,
            questionSet: null,
            question: 0,
            feedback: "Answer as fast as you can!"
        };
    }

    computeAnswer = (questions, answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState((prevState, props) => ({
                score: prevState.score + 1,
                feedback: "Fantastic!"
            }));
        } else {
            this.setState({
                feedback: "Try harder..."
            });
        }
        this.setState((prevState, props) => ({
            questionSet: questions,
            responses: prevState.responses < this.props.numberOfQuestions ? prevState.responses + 1 : this.props.numberOfQuestions
        }));
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
            feedback: "Answer as fast as you can!"
        });
    };

    componentDidMount() {
        if (this.props.questions && this.props.questions.length === 0) {
            this.props.getQuestions();
        }
    }

    handleTimeout = () => {
        this.setState({
            showResult: true
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
        const value = e.currentTarget.value;

        this.computeAnswer(questions, value, answer);

        if (this.state.question === this.props.numberOfQuestions - 1) {
            this.setState({
                showResult: true
            });
            return;
        }

        this.setState((prevState, props) => ({
            question: prevState.question + 1
        }));
    }

    showGameOver() {
        return (
            <div className="white-background">
                <br/>
                <h1>Game over</h1>
                <h2>Score: {this.state.score}</h2>
                <p>Answers: </p>
                {this.state.questionSet ?
                    this.state.questionSet.map((i, index) => <ExpansionPanel >
                        <ExpansionPanelSummary><span className="green-text">{index + 1}. {i.moduleCode} {i.title}</span></ExpansionPanelSummary>
                        <ExpansionPanelDetails><p>{i.description}</p></ExpansionPanelDetails>
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
        const { questions } = this.props;

        if (questions.length === 0) {
            return <div>Loading...</div>;
        }

        if (this.state.question >= this.props.settings.numberOfQuestions || this.state.showResult) {
            return this.showGameOver();
        }

        const questionSet = this.state.questionSet === null ? this.getQuestionSet() : this.state.questionSet;
        const question = questionSet[this.state.question];

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

        return (
            <div className="white-background">
            <div className="question-container">
                <Grid
                    container
                    direction="row">
                    <Grid item xs={12} className="question">
                        <p>{this.state.feedback}</p>
                        <p>{this.state.question} / {questionSet.length} answered</p>
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
                    </Grid>
                    <Grid item xs={12}>
                            <p className="question-text">{question.description.substring(0, question.description.indexOf('.') + 1)}</p>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="make-it-smaller">
                                <Button size="large" variant="contained" color="primary" fullWidth value={answers[0].moduleCode} onClick={e => this.handleClick(e, questionSet, question.moduleCode)}>A) {answers[0].moduleCode} {answers[0].title}</Button>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="make-it-smaller">
                            <Button size="large" variant="contained" color="secondary" fullWidth value={answers[1].moduleCode} onClick={e => this.handleClick(e, questionSet, question.moduleCode)}>B) {answers[1].moduleCode} {answers[1].title}</Button>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="make-it-smaller">
                            <Button size="large" variant="contained" color="secondary" fullWidth value={answers[2].moduleCode} onClick={e => this.handleClick(e, questionSet, question.moduleCode)}>C) {answers[2].moduleCode} {answers[2].title}</Button>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="make-it-smaller">
                            <Button size="large" variant="contained" color="primary" fullWidth value={answers[3].moduleCode} onClick={e => this.handleClick(e, questionSet, question.moduleCode)}>D) {answers[3].moduleCode} {answers[3].title}</Button>
                            </div>
                        </Grid>

                    </Grid>
                </div>
            </div>

        );

    }
}

const mapStateToProps = (state, ownProps) => ({
    settings: state.settings,
    questions: state.questions
});

export default withStyles(connect(mapStateToProps, { getQuestions })(Game));
