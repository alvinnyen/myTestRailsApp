const rawData = require('./data.json');
const moment = require('moment');
const cityMap = require('./langMap.js').cityMap;
const distMap = require('./langMap.js').distMap;

module.exports.getRestaurantList = function (weekday) {
    const data = [...rawData];

    return data.map(({
        id = -1,
        name = '',
        price = '',
        rating = 0,
        categories = [],
        photos: { 
            0: backgroundImgUrl = '' 
        } = {},
        location: {
            address1: address = '',
            city: dist = '',
            state: city = 'TPE'
        } = {},
        hours: {
            0: {
                open = []
            } = {}
        } = {}
    }) => {
        const opens = open.filter(({ day }) => day === weekday);

        return ({
            address: _getFullAddress(city, dist, address),
            backgroundImgUrl,
            id,
            name,
            opens,
            isOpen: _isOpen(opens),

            price,
            rating,
            categories: categories.map(({title}) => title)
        });
    });
}

function _isOpen (opens = [], timeString) {
    return opens.some(({ start, end }) => {
        const formatString = 'HHmm';
        const startTime = moment(start, formatString);

        let endTime = moment(end, formatString);
        if (parseInt(end) < 600) {
            endTime = endTime.add(1, 'd');
        }

        if (timeString) {
            const isBetween = moment(timeString, formatString).isBetween(startTime , endTime);

            return isBetween;
        }
        
        return moment().isBetween(startTime , endTime)
    });
}

module.exports.getTheRestaurantDetail = function (restaurantId, weekday) {
    const data = [...rawData];

    const {
        id = -1,
        name = '',
        price = '',
        rating = 0,
        categories = [],
        review_count: reviewCount = 0,
        photos: { 
            0: backgroundImgUrl = ''
        } = {},
        location: {
            address1: address = '',
            city: dist = '',
            state: city = 'TPE'
        } = {},
        hours: {
            0: {
                open = []
            } = {}
        } = {}
    } = data[restaurantId];

    const opens = open.filter(({ day }) => day === weekday);

    // let opensMap = {};
    // for(let i = 0; i < open.length; i++) {
    //     if (!opensMap[open[i].day]) {
    //         opensMap[open[i].day] = [`${open[i].start} ~ ${open[i].end}`];
    //     } else {
    //         opensMap[open[i].day].push(`${open[i].start} ~ ${open[i].end}`);
    //     }
    // }
    
    return {
        id,
        name,
        address: _getFullAddress(city, dist, address),
        rating,
        price,
        categories: categories.map(({title}) => title),
        reviewCount,
        backgroundImgUrl,
        opensMap: open.reduce((accuOpensMap = {}, openObject = {}) => {
            if (!accuOpensMap[openObject.day]) {
                accuOpensMap[openObject.day] = [`${openObject.start} ~ ${openObject.end}`];
            } else {
                accuOpensMap[openObject.day].push(`${openObject.start} ~ ${openObject.end}`);
            }
        
            return accuOpensMap;
        }, {}),
        isOpen: _isOpen(opens)
    };
};

module.exports.getRestaurantListByTime = function (timeString, weekday) {
    const data = [...rawData];

    const restaurantListByTime = data.filter(({
        hours: {
            0: {
                open = []
            } = {}
        } = {}
    }) => {
        const opens = open.filter(({ day }) => day === weekday);

        return _isOpen(opens, timeString);
    }).map(({
        id = -1,
        name = '',
        price = '',
        rating = 0,
        categories = [],

        photos: { 
            0: backgroundImgUrl = ''
        } = {},
        location: {
            address1: address = '',
            city: dist = '',
            state: city = 'TPE'
        } = {},
        hours: {
            0: {
                open = []
            } = {}
        } = {}
    }) => {
        const opens = open.filter(({ day }) => day === weekday);

        return ({
                address: _getFullAddress(city, dist, address),
                backgroundImgUrl,
                id,
                name,
                opens,
                
                // no need in the search result page
                // isOpen: _isOpen(opens)

                price,
                rating,
                categories: categories.map(({title}) => title)
        });
    });

    return restaurantListByTime;
};

const _getFullAddress = (city, dist, address) => {
    return (cityMap[city] || city) + (distMap[dist] || dist) + address
};
