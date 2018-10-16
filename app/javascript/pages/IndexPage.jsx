import React, { Component } from 'react';
import { getRestaurantList } from '../dataParser.js';
import moment from 'moment';
// import { Link } from 'react-router-dom';
// import Card from '../components/Card.jsx';
import CardList from '../components/CardList.jsx';

import TimeSearchForm from '../components/TimeSearchForm.jsx';
import DateTimeSearchForm from '../components/DateTimeSearchForm.jsx';

const getStyles = (nameOfBlock, backgroundImage) => {
    const styles = {
        container: {
            maxWidth: '960px',
            border: '2px solid red',
            margin: '0 auto'
        },
        // imgBanner: {
        //     backgroundImage,
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center center',
        //     // borderRadius: '4px',
        //     height: '300px',
        //     width: '100%'
        // },
        // ratingAndReviewCount: {
        //     // display: 'flex'
        // },
        // rating: {
        //     marginRight: '20px'
        // },
        // price: {
        //     marginRight: '20px'
        // },
        // linkButton: {
        //     display: 'inline-block',
        //     marginTop: '20px'
        // }
    };

    return styles[nameOfBlock];
}

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
            <div style={ getStyles('container') }>
                <TimeSearchForm />
                <DateTimeSearchForm/>
                <CardList
                    restaurantList={restaurantList}
                />
            </div>
        );
    }
}

export default IndexPage;