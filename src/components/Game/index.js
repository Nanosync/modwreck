import React, { Component } from "react";
import QuestionBox from "./QuestionBox";
import Result from "./Result";
import Timer from './Timer'
import './game.css'
import { connect } from 'react-redux';

class Game extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        questionBank: [],
        score: 0,
        responses: 0, //no. of questions answered
        isLoaded: false,
        showResult: false,
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
        const { settings } = this.props;
        this.getQuestions(settings);
        //condition fails during render
        this.setState({
            score: 0,
            responses: 0,
            showResult: false,
        });
    };
    getQuestions = (settings) => {
        fetch("https://api.nusmods.com/v2/2019-2020/moduleInfo.json")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    questionBank: json.filter(list => list.faculty.includes(settings.category) || settings.category === "All")
                        .filter(list => list.description !== "" && !list.moduleCode.endsWith("R"))
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 5)

                })
            });
    };

    componentDidMount() {
        const { settings } = this.props;
        this.getQuestions(settings);
    }

    handleTimeout = () => {
        this.setState({
            showResult: true
        })
    }

    render() {
        var { isLoaded } = this.state;

        if (!isLoaded) {
            return <h1> Loading... </h1>;
        } else {

            var optionsBank = [];

            this.state.questionBank.map(
                (module) => (
                    optionsBank.push((module.moduleCode.toString() + " " + module.title.toString()))
                ))

            optionsBank = optionsBank.sort(() => Math.random() - 0.5);

            console.log(this.props.settings);

            return (
                <div className="quizContainer">
                    {this.state.questionBank.length > 0
                        && !this.state.showResult
                        && this.state.responses < 5
                        ?
                        <div>
                            <div className="tableTitle">
                                <table className="table">
                                    <tr>
                                        {/* <th className="textLeft">
                                                <h1>QuizBee</h1>
                                            </th> */}
                                        <th className="textCenter">
                                            <Timer minutes={this.props.settings.time} seconds={0} onTimeout={this.handleTimeout} />
                                        </th>
                                    </tr>
                                </table>
                            </div>

                            {this.state.questionBank.map(
                                (module) => (
                                    <QuestionBox
                                        question={module.description}
                                        options={optionsBank}
                                        selected={answer => this.computeAnswer(answer, module.moduleCode.toString() + " " + module.title.toString())}
                                    />
                                )
                            )}
                        </div>
                        : null
                    }

                    {this.state.responses === 5 || this.state.showResult ? (
                        <Result score={this.state.score} playAgain={this.playAgain} />
                    ) : null}
                </div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    settings: state.settings
});

export default connect(mapStateToProps,null)(Game);
