import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/Home.jsx';
import About from '../components/About.jsx';
import Contact from '../components/Contact.jsx';

import IndexPage from './IndexPage.jsx';

class App extends Component {
    render () {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={IndexPage} />
                    <Route exact path="/about/:department" component={About} />
                    <Route exact path="contact" component={Contact} />
                </Switch>
            </div>
        );
    }
}

export default App;