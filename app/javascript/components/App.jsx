import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';

class App extends Component {
    render () {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="contact" component={Contact} />
                </Switch>
            </div>
        );
    }
}

export default App;