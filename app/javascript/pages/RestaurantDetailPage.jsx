import React, { Component } from 'react';
import { getTheRestaurantDetail } from '../dataParser.js';
import moment from 'moment';
import { Link } from 'react-router-dom';

const getStyles = (nameOfBlock, backgroundImage) => {
    const styles = {
        container: {
            // marginBottom: '40px'
        },
        imgBanner: {
            backgroundImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            // borderRadius: '4px',
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

        const {
            restaurantDetail: {
                address = '',
                backgroundImgUrl = '',
                categories = '',
                id = 0,
                isOpen = false,
                name = '',
                price = '',
                rating = 0,
                reviewCount = 0,
                opens = []
            } = {}
        } = this.state;

        let backgroundImage = `url(${backgroundImgUrl})`;
        if (!isOpen) {
            // backgroundImage = 'radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), ' + backgroundImage;
            backgroundImage = 'linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), ' + backgroundImage;
        }

        return (
            <div>
                <div style={getStyles('imgBanner', backgroundImage)} />
                <div>
                    <div>{name}</div>
                    <div>
                        <span style={getStyles('rating')}>{rating}</span>
                        <span>{reviewCount}</span>
                    </div>
                    <div>
                        <span style={getStyles('price')}>{price}</span>
                        <span>{categories}</span>
                    </div>
                    <div>{`address: ${address}`}</div>
                    <div>
                        {
                            `今日營業時間: ${
                                opens.map(({ start, end }) => {
                                    return `${start}~${end}`
                                }).join(', ')
                            }`
                        }
                    </div>
                </div>

                <Link
                    to="/"
                    style={getStyles('linkButton')}
                >
                    返回首頁
                </Link>
            </div>
        );
    }
}

export default RestaurantDetailPage;