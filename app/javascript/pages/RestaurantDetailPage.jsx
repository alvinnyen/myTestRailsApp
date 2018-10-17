import React, { Component } from 'react';
import { getTheRestaurantDetail } from '../dataParser.js';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Tag from '../components/Tag.jsx';
import Button from '../components/Button.jsx';

const getStyles = (nameOfBlock, backgroundImage) => {
    const styles = {
        outerContainer: {
            padding: 0,
            margin: 0
        },
        contentBox: {
            border: '2px solid red',
            padding: '16px',
            color: 'rgba(0, 0, 0, 0.87)'
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

        container: {
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
        ratingAndReviewCount: {
            // display: 'flex'
        },
        rating: {
            marginRight: '20px'
        },
        price: {
            marginRight: '20px'
        },
        linkButton: {
            display: 'inline-block',
            marginTop: '20px'
        },
        button: {
            marginTop: '30px'
        }
    };

    return styles[nameOfBlock];
}

class RestaurantDetailPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurantDetail: {}
        }
    }

    componentDidMount() {
        const {
            match: {
                params: {
                    restaurantId = '0'
                } = {}
            } = {}
            // isExact: true
            // params: {restaurantId: "2"}
            // path: "/restaurant/:restaurantId"
            // url: "/restaurant/2"
            // __proto__: Object
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
            } = {},

            match: {
                params: {
                    restaurantId = '0'
                } = {}
            } = {}
            // isExact: true
            // params: {restaurantId: "2"}
            // path: "/restaurant/:restaurantId"
            // url: "/restaurant/2"
            // __proto__: Object
        } = this.props;

        // console.log('in RestaurantDetailPage');
        // console.log(this.props.location);
        // console.log(`backTo: ${backTo}`)
        // console.log(' ');

        const {
            restaurantDetail: {
                address = '',
                backgroundImgUrl = '',
                categories = [],
                id = 0,
                isOpen = false,
                name = '',
                price = '',
                rating = 0,
                reviewCount = 0,
                opensMap = {}
            } = {}
        } = this.state;

        let backgroundImage = `url(${backgroundImgUrl})`;
        if (!isOpen) {
            // backgroundImage = 'radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), ' + backgroundImage;
            backgroundImage = 'linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), ' + backgroundImage;
        }

        const weekDayMap = {
            0: 'Sun.',
            1: 'Mon.',
            2: 'Tue.',
            3: 'Wed.',
            4: 'Thu.',
            5: 'Fri.',
            6: 'Sat.'
        };

        // {`${weekDayMap[dayNumber]}  ${opensMap[dayNumber].join(', ')}`}
        let opens = [];
        for (let dayNumber in opensMap) {
            let redColor = {}
            if (parseInt(dayNumber) === moment().weekday()) {
                redColor['color'] = 'red';
            }
            opens.push(
                <div key={dayNumber} style={{ display: 'inline-block', marginTop: '10px' }}>
                    <span style={{ display: 'inline-block', width: '80px', ...redColor }}>{weekDayMap[dayNumber]}</span>
                    <span style={{ ...redColor }}>{opensMap[dayNumber].join(', ')}</span>
                </div>
            );
        }

        return (
            <div style={getStyles('outerContainer')}>
                <div style={getStyles('imgBanner', backgroundImage)} />
                <div style={getStyles('container')}>

                    <h2 style={getStyles('titleFontStyle')}>{name}</h2>

                    <p style={getStyles('paragraphFontStyle')}>
                        <div>{address}</div>
                        <div style={getStyles('priceDiv')}>
                            <span>{price}</span>
                            <span style={{ color: 'rgba(0, 0, 0, 0.87)' }}> / </span>
                            <span>$$$</span>
                        </div>
                    </p>
                    <p style={getStyles('paragraphFontStyle')}>
                        <div>{categories.map((title, index) => (<Tag key={index} text={title} />))}</div>
                        <div>{`rating: ${rating} / 5`}</div>
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {opens}

                        {/* <Link
                            to="/"
                            style={getStyles('linkButton')}
                        >
                            返回首頁
                        </Link> */}

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