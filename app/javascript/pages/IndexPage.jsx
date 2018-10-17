import React, { Component } from 'react';
import moment from 'moment';

import { getRestaurantList } from '../dataParser.js';
import CardList from '../components/CardList.jsx';
import DateTimeSearchForm from '../components/DateTimeSearchForm.jsx';

const getStyles = (nameOfBlock) => {
    const styles = {
        container: {
            maxWidth: '960px',
            // border: '2px solid red',
            margin: '0 auto'
        },
        searchBar: {
            display: 'flex',
            justifyContent: 'center',
        }
    };

    return styles[nameOfBlock];
}

class IndexPage extends Component {
    state = {
        restaurantList: []
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
            <div style={getStyles('container')}>
                <div style={getStyles('searchBar')}>
                    <DateTimeSearchForm/>
                </div>
                <CardList
                    restaurantList={restaurantList}
                />
            </div>
        );
    }
}

export default IndexPage;
