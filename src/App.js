import React from 'react';
import WelcomePage from './components/Welcome';
import SettingsPage from './components/Settings';
import GamePage from './components/Game';
import './assets/App.css'
import {ScalingSquaresSpinner} from "react-epic-spinners";


import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';


function App() {
    return (
        <div className="App">
            <div className="App-header">
                <div className="game-title">
                    <h1 className="game-title-font">ModWreck</h1>
                </div>
                <div className="spinner-container">
                    <ScalingSquaresSpinner color="grey" size="150" className="spinner"/>
                </div>
            </div>
            <div className="">
                <Router>
                    <div>
                        <Switch>
                            <Route path="/" exact component={WelcomePage} />
                            <Route path="/settings" component={SettingsPage} />
                            <Route path="/game" component={GamePage} />
                        </Switch>
                    </div>
                </Router>
            </div>
        </div>
    );
}

export default App;
