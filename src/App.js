import React from 'react';
import WelcomePage from './components/Welcome';
import SettingsPage from './components/Settings';
import GamePage from './components/Game';
import './assets/App.css'
import {ScalingSquaresSpinner} from "react-epic-spinners";
import ParticlesBg from 'particles-bg';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


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
                    <h1 className="game-title-font"><b>ModWreck</b></h1>
                </div>
                <div className="spinner-container">
                    <ScalingSquaresSpinner color="#e1e1e1" size="150" className="spinner"/>
                </div>
            </div>
            <div>
                <Router>
                    <div>
                        <TransitionGroup>
                            <CSSTransition timeout={300} classNames='fade'>
                                <Switch>
                                    <Route path="/" exact component={WelcomePage} />
                                    <Route path="/settings" component={SettingsPage} />
                                    <Route path="/game" component={GamePage} />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                </Router>
            </div>
            <ParticlesBg type="circle" bg={true} />
        </div>
    );
}

export default App;
