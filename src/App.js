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
                <h1 className="game-title">ModWreck</h1>
                <div className="spinner-container">
                    <ScalingSquaresSpinner color="red" size="100" className="spinner"/>
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
