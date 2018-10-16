import React, { Component } from 'react';
import queryString from 'query-string';

import { getRestaurantListByTime } from '../dataParser.js';
import moment from 'moment';
// import Card from '../components/Card.jsx';
import { Link } from 'react-router-dom';
import CardList from '../components/CardList.jsx';

const getStyles = (nameOfBlock, backgroundImage) => {
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
            boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
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

        this.setState({
            restaurantList: getRestaurantListByTime(
                queryString.parse(this.props.location.search).time, 
                moment().weekday()
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

        return (
            <div style={ getStyles('container') }>
                <Link
                    to="/"
                    style={getStyles('buttonContainer')}
                >
                    <button
                        style={getStyles('linkButton')}
                    >
                        返回首頁
                    </button>
                </Link>
                <div 
                    style={getStyles('searchResultTitle')}
                >
                    {`${queryString.parse(this.props.location.search).time} search result`}
                </div>
                <CardList
                    restaurantList={restaurantList}
                    isSearchResultPage={true}
                />
            </div>
        );
    }
}

export default SearchResultPage;