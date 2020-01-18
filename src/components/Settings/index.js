import React, { Component } from 'react';
import DEFAULT_GAME_SETTINGS from '../../services/Settings';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: DEFAULT_GAME_SETTINGS
        };
    }
    render() {
        const { numberOfQuestions, difficulty, category } = this.state.game;
        return (
            <div>
                <p>Number of Questions: {numberOfQuestions}</p>
                <p>Difficulty: {difficulty}</p>
                <p>Category: {category}</p>
            </div>
        );
    }
}

export default Settings;
