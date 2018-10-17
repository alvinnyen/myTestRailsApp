import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import IndexPage from './IndexPage.jsx';
import RestaurantDetailPage from './RestaurantDetailPage.jsx';
import SearchResultPage from './SearchResultPage.jsx';
import TestPage from './TestPage.jsx';


class App extends Component {
    render () {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={IndexPage} />
                    <Route exact path="/restaurant/:restaurantId" component={RestaurantDetailPage} />
                    <Route exact path="/search" component={SearchResultPage} />
                    <Route exact path="/test" component={TestPage} />
                </Switch>
            </div>
        );
    }
}

export default App;