import React, { Component } from 'react';
import moment from 'moment';
import queryString from 'query-string';
import {withRouter} from "react-router-dom";

import { getRestaurantListByTime } from '../dataParser.js';
import CardList from '../components/CardList.jsx';
import Button from '../components/Button.jsx';

const getStyles = (nameOfBlock) => {
    const styles = {
        container: {
            // marginBottom: '40px',
            maxWidth: '960px',
            // border: '2px solid red',
            margin: '0 auto',
            
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        buttonContainer: {
            position: 'fixed',
            right: 50,
            bottom: 50
        },
        searchResultTitle: {
            // border: '2px solid red',
            display: 'inline-block',

            fontSize: '24px',
            fontWeight: 400,
            // margin: '0px 0px 0.35em',
            margin: '40px',
            lineHeight: 1.33,
            color: 'rgba(0, 0, 0, 0.87)'
        }
    };

    return styles[nameOfBlock];
}

class SearchResultPage extends Component {
    state = {
        restaurantList: []
    }

    componentDidMount () {
        const {
            location: {
                search = ''
            } = {}
        } = this.props;

        const queryObject = queryString.parse(search) || {};
        const time = queryObject.time;
        const weekday = parseInt(queryObject.weekday);

        this.setState({
            restaurantList: getRestaurantListByTime(time, weekday)
        });
    }

    render () {
        const {
            restaurantList = []
        } = this.state;

        const {
            location: {
                pathname = '',
                search =''
            } = {},
            history: {
                push = () => {}
            }
        } = this.props;

        const queryObject = queryString.parse(search) || {};

        if (!queryObject.datetimeMs || !queryObject.weekday || !queryObject.time) {
            push('/');
            return;
        }

        const datetimeMs = queryObject.datetimeMs;

        const searchResultTitle = (datetimeMs && `${moment(parseInt(datetimeMs)).format('dddd ,MM/DD YYYY, HH:mm')} search result`) ||
                                    `${queryObject.time} search result`;

        return (
            <div style={getStyles('container')}>
                <div
                    style={getStyles('buttonContainer')}
                >
                    <Button />
                </div>
                <div 
                    style={getStyles('searchResultTitle')}
                >
                    {searchResultTitle}
                </div>
                <CardList
                    restaurantList={restaurantList}
                    isSearchResultPage={true}
                    searchWeekday={parseInt(queryString.parse(this.props.location.search).weekday)}
                    backTo={pathname + search}
                />
            </div>
        );
    }
}

export default withRouter(SearchResultPage);
