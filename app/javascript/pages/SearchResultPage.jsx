import React, { Component } from 'react';
import queryString from 'query-string';

import { getRestaurantListByTime } from '../dataParser.js';
import moment from 'moment';
// import Card from '../components/Card.jsx';
import { Link } from 'react-router-dom';
import CardList from '../components/CardList.jsx';
import Button from '../components/Button.jsx';

const getStyles = (nameOfBlock) => {
    const styles = {
        container: {
            // marginBottom: '40px',
            maxWidth: '960px',
            border: '2px solid red',
            margin: '0 auto',
            textAlign: 'center'
        },
        buttonContainer: {
            position: 'fixed',
            right: 50,
            bottom: 50
        },
        linkButton: {
            display: 'inline-block',
            padding: '8px 16px',
            color: '#fff',
            backgroundColor: 'rgb(225, 0, 80)',
            margin: '8px',
            boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.2), 1px 1px 1px 0px rgba(0, 0, 0, 0.14), 1px 2px 1px -1px rgba(0, 0, 0, 0.12)',
            transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            lineHeight: '1.5',
            fontWeight: '500',
            borderRadius: '4px'
        },
        searchResultTitle: {
            border: '2px solid red',
            display: 'inline-block',

            fontSize: '24px',
            fontWeight: 400,
            margin: '0px 0px 0.35em',
            lineHeight: 1.33,
            color: 'rgba(0, 0, 0, 0.87)'
        }
    };

    return styles[nameOfBlock];
}

class SearchResultPage extends Component {
    constructor() {
        super();
        this.state = {
            restaurantList: []
        }
    }

    componentDidMount () {
        // console.log('componentDidMount');
        // console.log(queryString.parse(this.props.location.search));
        // console.log(' ');
        // console.log(`queryString.parse(this.props.location.search).time: ${queryString.parse(this.props.location.search).time}`);
        // console.log(`queryString.parse(this.props.location.search).weekday: ${queryString.parse(this.props.location.search).weekday}`);

        this.setState({
            // restaurantList: getRestaurantListByTime(
            //     queryString.parse(this.props.location.search).time, 
            //     moment().weekday()
            // )
            restaurantList: getRestaurantListByTime(
                queryString.parse(this.props.location.search).time, 
                parseInt(queryString.parse(this.props.location.search).weekday)
            )
        });
    }

    render () {
        // console.log(queryString.parse);
        // console.log(this.props.location.search);
        // console.log(queryString.parse(this.props.location.search));
        // console.log(' ');

        const {
            restaurantList = []
        } = this.state;

        // console.log('in component');
        // console.log(restaurantList);
        // console.log(' ');

        const {
            location: {
                pathname = '',
                search =''
            } = {}
        } = this.props;

        // console.log(this.props.location);
        // console.log(`pathname: ${pathname}`);
        // console.log(' ');

        const queryObject = queryString.parse(search) || {};
        const datetimeMs = queryObject.datetimeMs;
        // console.log(moment(parseInt(datetimeMs)));
        const datetimeString = moment(datetimeMs).format('MMMM Do YYYY, h:mm:ss a');

        return (
            <div style={ getStyles('container') }>
                {/* <Link
                    to="/"
                    style={getStyles('buttonContainer')}
                >
                    <Button />
                </Link> */}
                <div
                    style={getStyles('buttonContainer')}
                >
                    <Button />
                </div>
                <div 
                    style={getStyles('searchResultTitle')}
                >
                    {
                        (datetimeMs && `${moment(parseInt(datetimeMs)).format('dddd ,MM/DD YYYY, HH:mm')} search result`) ||
                        `${queryString.parse(search).time} search result`
                    }
                </div>
                <CardList
                    restaurantList={restaurantList}
                    isSearchResultPage={true}
                    backTo={pathname + search}
                />
            </div>
        );
    }
}

export default SearchResultPage;