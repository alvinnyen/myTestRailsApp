import React, { Component } from 'react';
import queryString from 'query-string';

import { getRestaurantListByTime } from '../dataParser.js';
import moment from 'moment';
import Card from '../components/Card.jsx';
import { Link } from 'react-router-dom';

const getStyles = (nameOfBlock, backgroundImage) => {
    const styles = {
        container: {
            // marginBottom: '40px'
        },
        buttonContainer: {
            marginBottom: '20px',
            position: 'fixed',
            right: 0,
            bottom: 0
        },
        linkButton: {
            display: 'inline-block'
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
            <div>
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
                {
                    restaurantList.map((
                        {address, backgroundImgUrl, id, isOpen, name, opens}
                    ) => {

                        return (
                            <Link
                                to={`/restaurant/${id}`}
                                key={id}
                            >
                                <Card 
                                    id={id}
                                    address={address}
                                    backgroundImgUrl={backgroundImgUrl}
                                    name={name} 
                                    opens={opens}
                                    isOpen={isOpen}
                                    isSearchResultPage={true}
                                />
                            </Link>
                        );
                    })
                }
            </div>
        );
    }
}

export default SearchResultPage;