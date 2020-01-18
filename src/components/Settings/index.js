import React, { Component } from 'react';
import DEFAULT_GAME_SETTINGS from '../../services/Settings';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";

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
                <Button component={ Link } to="/" variant="contained" color="primary">
                    Save
                </Button>
            </div>

        );
    }
}

export default Settings;
