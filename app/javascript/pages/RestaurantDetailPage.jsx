import React, { Component } from 'react';
import moment from 'moment';

import { getTheRestaurantDetail } from '../dataParser.js';
import Tag from '../components/Tag.jsx';
import Button from '../components/Button.jsx';
import { weekDayMap } from '../configs/langMap.js';

const getStyles = (nameOfBlock, backgroundImage) => {
    const styles = {
        outerContainer: {
            padding: 0,
            margin: 0
        },
        titleFontStyle: {
            display: 'inline-block',
            fontSize: '24px',
            fontWeight: '400',
            margin: 0,
            marginBottom: '0.35em',
            lineHeight: '1.33'
        },
        paragraphFontStyle: {
            margin: 0,
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
        },
        priceDiv: {
            color: '#FFD700'
        },
        innerContainer: {
            boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.2), 1px 1px 1px 0px rgba(0, 0, 0, 0.14), 1px 2px 1px -1px rgba(0, 0, 0, 0.12)',
            maxWidth: '960px',
            padding: '30px',
            // border: '2px solid red',
            margin: '0 auto',
            borderRadius: '10px',
            marginTop: '20px'
        },
        imgBanner: {
            backgroundImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            borderRadius: '4px',
            height: '300px',
            width: '100%'
        },
        button: {
            marginTop: '30px'
        },
        inlineBlock: {
            display: 'inline-block'
        },
        divideSign: {
            color: 'rgba(0, 0, 0, 0.87)'
        },
        opensBlockContainer: {
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'
        }
    };

    return styles[nameOfBlock];
}

class RestaurantDetailPage extends Component {
    state = {
        restaurantDetail: {}
    }

    componentDidMount() {
        const {
            match: {
                params: {
                    restaurantId = '0'
                } = {}
            } = {}
        } = this.props;

        const restaurantDetail = getTheRestaurantDetail(restaurantId, moment().weekday());
        // {
        //     address: '市府路45號',
        //     backgroundImgUrl: 'https://s3-media3.fl.yelpcdn.com/bphoto/cDAeCrv5BFKcH729xJrtZg/o.jpg',
        //     categories: 'Shanghainese, Dim Sum, Taiwanese',
        //     end: '2130',
        //     id: 2,
        //     isOpen: true,
        //     name: '鼎泰豐',
        //     price: '$$',
        //     rating: 4.5,
        //     reviewCount: 228,
        //     start: '1100',
        // }

        this.setState({ restaurantDetail: { ...restaurantDetail } });
    }

    render() {
        const {
            location: {
                state: {
                    backTo = ''
                } = {}
            } = {}
        } = this.props;

        const {
            restaurantDetail: {
                address = '',
                backgroundImgUrl = '',
                categories = [],
                // id = 0,
                isOpen = false,
                name = '',
                price = '',
                rating = 0,
                // reviewCount = 0,
                opensMap = {}
            } = {}
        } = this.state;

        let backgroundImage = `url(${backgroundImgUrl})`;
        if (!isOpen) {
            backgroundImage = 'linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), ' + backgroundImage;
        }

        let opens = [];
        for (let dayNumber in opensMap) {
            const isToday = parseInt(dayNumber) === moment().weekday();
            let todayOpen = '';
            let colorRed = {}
            if (isToday) {
                colorRed['color'] = 'red';
                todayOpen = '今日營業時間';
            }

            opens.push(
                <div key={dayNumber} style={{ marginTop: '10px', ...colorRed }}>
                    <span style={{ ...getStyles('inlineBlock'), width: '120px' }}>{todayOpen}</span>
                    <span style={{ ...getStyles('inlineBlock'), width: '70px' }}>{weekDayMap[dayNumber]}</span>
                    <span style={{ ...getStyles('inlineBlock'), width: '200px'}}>{opensMap[dayNumber].join(', ')}</span>
                </div>
            );
        }

        const tags = categories.map((title, index) => (<Tag key={index} text={title} />));

        const ratingString = `rating: ${rating} / 5`;

        return (
            <div style={getStyles('outerContainer')}>
                <div style={getStyles('imgBanner', backgroundImage)} />
                <div style={getStyles('innerContainer')}>
                    <h2 style={getStyles('titleFontStyle')}>{name}</h2>
                    <p style={getStyles('paragraphFontStyle')}>
                        <div>{address}</div>
                        <div style={getStyles('priceDiv')}>
                            <span>{price}</span>
                            <span style={getStyles('divideSign')}> / </span>
                            <span>$$$</span>
                        </div>
                    </p>
                    <p style={getStyles('paragraphFontStyle')}>
                        <div>{tags}</div>
                        <div>{ratingString}</div>
                    </p>
                    <div style={getStyles('opensBlockContainer')}>
                        {opens}
                        <Button 
                            style={getStyles('button')}
                            backTo={backTo}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default RestaurantDetailPage;
