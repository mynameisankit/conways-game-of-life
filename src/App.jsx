import React from 'react';
import { Switch, Route } from "react-router-dom";
//Pages
import Home from './pages';

function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path='/' component={Home} />
            </Switch>
        </React.Fragment>
    );
}

export default App;
