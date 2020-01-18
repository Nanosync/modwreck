import React from 'react';
import WelcomePage from './components/Welcome';
import SettingsPage from './components/Settings';
import GamePage from './components/Game';
import './assets/App.css'
import {SwappingSquaresSpinner} from "react-epic-spinners";


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
                <h1>ModWreck</h1>
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
