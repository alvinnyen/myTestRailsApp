import React, { Component } from 'react';
import { getRestaurantList } from '../dataParser.js';
import moment from 'moment';

class IndexPage extends Component {
    constructor() {
        super();
        this.state = {
            restaurantList: []
        }
    }

    componentDidMount () {
        this.setState({
            restaurantList: getRestaurantList(moment().weekday())
        });
    }

    render () {
        const {
            restaurantList = []
        } = this.state;

        return (
            <div>
                {
                    restaurantList.map(({name, id}) => <div key={id}>{name}</div>)
                }
            </div>
        );
    }
}

export default IndexPage;