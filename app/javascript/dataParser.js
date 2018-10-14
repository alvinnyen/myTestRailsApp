const rawData = require('./data.json');
const moment = require('moment');

module.exports.getRestaurantList = function (weekday) {
    const data = [...rawData];

    return data.map(({
        id, 
        name, 
        photos: { 
            0: backgroundImgUrl 
        } = {},
        location: {
            address1: address
        } = {},
        hours: {
            0: {
                open = []
            } = {}
        } = {}
    }) => {
        const start = open[weekday] && open[weekday].start;
        const end = open[weekday] && open[weekday].end;

        return ({
                address,
                backgroundImgUrl,
                id,
                name,
                start,
                end,
                isOpen: _isOpen(start, end)
        });
    });
}

function _isOpen (start, end) {
    const formatString = 'HHmm';
    const startTime = moment(start, formatString);
    const endTime = moment(end, formatString);

    return moment().isBetween(startTime , endTime)
}

module.exports.getTheRestaurantDetail = function (restaurantId, weekday) {
    const data = [...rawData];
    const {
        id,
        name,
        rating,
        review_count: reviewCount,
        price,
        categories = [],
        photos: { 
            0: backgroundImgUrl 
        } = {},
        location: {
            address1: address
        } = {},
        hours: {
            0: {
                open = []
            } = {}
        } = {}
    } = data[restaurantId];

    const start = open[weekday] && open[weekday].start;
    const end = open[weekday] && open[weekday].end;
    
    return {
        id,
        name,
        address,
        rating,
        price,
        categories: categories.map(({title}) => title).join(', '),
        reviewCount,
        backgroundImgUrl,
        start,
        end,
        isOpen: _isOpen(start, end)
    };
};

console.log(module.exports.getTheRestaurantDetail(1, 1));