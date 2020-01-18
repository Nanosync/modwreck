import React, { Component } from 'react';
import quizService from '../../services/Quiz';
import QuestionBox from './QuestionBox';
import Result from './Result';
import Timer from './Timer'
import './game.css'

class App extends Component {
    state = {
        questionBank: [],
        score: 0,
        responses: 0, //no. of questions answered
        showResult: false,

    };
    getQuestions = () => {
        quizService().then(question => {
            this.setState({
                questionBank: question
            });
        });
    };
    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        });
    };
    playAgain = () => {
        this.getQuestions();
        //condition fails during render
        this.setState({
            score: 0,
            responses: 0
        });
    };
    getQuestions = () => {
        fetch("https://api.nusmods.com/v2/2019-2020/moduleInfo.json")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    questionBank: json.filter(
                        list => list.faculty.includes("Computing")).filter(list => list.description != "" && !list.moduleCode.endsWith("R")).sort(() => 0.5 - Math.random()).slice(0, 5)
                })
            });
    };

    componentDidMount() {
        this.getQuestions();
    }

    handleTimeout = () => {
        this.setState({
            showResult: true
        })
    }
    render() {
        return (
            <div className="quizContainer">
                <div className="tableTitle">
                    <table className="table">
                        <tr>
                            <th className="textLeft">
                                <h1>QuizBee</h1>
                            </th>
                            <th className="textRight">
                                {!this.state.showResult ? <Timer minutes={0} seconds={10} onTimeout={this.handleTimeout}/>: null}
                            </th>
                        </tr>
                    </table>
                </div>
                {this.state.questionBank.length > 0
                && !this.state.showResult
                && this.state.responses < 5
                && this.state.questionBank.map(
                    ({ question, answers, correct, questionId }) => (
                        <QuestionBox
                            question={question}
                            options={answers}
                            key={questionId}
                            selected={answer => this.computeAnswer(answer, correct)}
                        />
                    )
                )}

                {this.state.responses === 5 || this.state.showResult ? (
                    <Result score={this.state.score} playAgain={this.playAgain} />
                ) : null}

            </div>
        );
    }
}

export default App;
