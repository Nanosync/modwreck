import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import QuestionBox from "./QuestionBox";
import Result from "./Result";
import Timer from './Timer';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './game.css';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { getQuestions } from '../../redux/actions';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            responses: 0,
            showResult: false,
            questionSet: null,
            question: 0
        };
    }

    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState((prevState, props) => ({
                score: prevState.score + 1
            }));
        }
        this.setState((prevState, props) => ({
            responses: prevState.responses < this.props.numberOfQuestions ? prevState.responses + 1 : this.props.numberOfQuestions
        }));
    };

    playAgain = () => {
        const { settings } = this.props;
        this.getQuestions(settings);
        //condition fails during render
        window.scrollTo(0, 0);
        this.setState({
            score: 0,
            responses: 0,
            showResult: false,
        });
    };

    componentDidMount() {
        this.props.getQuestions();
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

        // Copy array
        let array = questions.data.slice(0, questions.data.length).filter(i => i.description !== "");

        // Shuffle array
        const shuffled = array.sort(() => 0.5 - Math.random());

        // Get sub-array of first n elements after shuffled
        const questionSet = shuffled.slice(0, numberOfQuestions);

        //console.log(questionSet);
        
        return questionSet;
    }

    handleClick(e, answer) {
        e.preventDefault();
        const value = e.currentTarget.value;

        this.computeAnswer(value, answer);

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

    render() {
        const { questions } = this.props;

        if (questions.length === 0) {
            return <div>Loading...</div>;
        }

        if (this.state.question >= this.props.settings.numberOfQuestions) {
            return <div>Game over</div>;
        }

        const questionSet = this.getQuestionSet();
        const question = questionSet[this.state.question];

        const answers = [];
        answers.push(question);

        let arr = questionSet.slice(0, questionSet.length);
        const shuffled = arr.sort(() => 0.5 - Math.random());
        //for (let i = 0; i < 3; i++) {
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
            <div className="question-container">
                <Grid
                    container
                    direction="row">
                    <Grid item xs={12} className="question">
                    <CountdownCircleTimer
                                    // isLinearGradient={true}
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
                                                <h1>{remainingTime}</h1>
                                            </div>
                                        )
                                    }}
                                    onComplete = {this.handleTimeout}
                                />
                        <p>{question.description}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth value={answers[0].moduleCode} onClick={e => this.handleClick(e, question.moduleCode)}>A) {answers[0].moduleCode} {answers[0].title}</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth value={answers[1].moduleCode} onClick={e => this.handleClick(e, question.moduleCode)}>B) {answers[1].moduleCode} {answers[1].title}</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth value={answers[2].moduleCode} onClick={e => this.handleClick(e, question.moduleCode)}>C) {answers[2].moduleCode} {answers[2].title}</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" fullWidth value={answers[3].moduleCode} onClick={e => this.handleClick(e, question.moduleCode)}>D) {answers[3].moduleCode} {answers[3].title}</Button>
                    </Grid>

                </Grid>
            </div>
        );

    }
}

const mapStateToProps = (state, ownProps) => ({
    settings: state.settings,
    questions: state.questions
});

export default connect(mapStateToProps, { getQuestions })(Game);
