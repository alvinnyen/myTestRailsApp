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
                    // TODO verify if the open array was sorted
        const opens = open.filter(({ day }) => day === weekday);

        return ({
                address,
                backgroundImgUrl,
                id,
                name,
                opens,
                isOpen: _isOpen(opens)
        });
    });
}

function _isOpen (opens = [], test) {
    return opens.some(({ start, end }) => {
        const formatString = 'HHmm';

        const startTime = moment(start, formatString);

        let endTime = moment(end, formatString);
        // TODO try catch
        if (parseInt(end) < 600) {
            endTime = endTime.add(1, 'd');
        }

        // if (test) {
        //     const isBetween = moment(test, formatString).isBetween(startTime , endTime);

        //     console.log(`test: ${test}`);
        //     console.log(`startTime: ${startTime}`)
        //     console.log(`endTime: ${endTime}`)
        //     console.log(`isBetween: ${isBetween}`);
        //     console.log(' ');

        //     return isBetween;
        // }
        
        return moment().isBetween(startTime , endTime)
    });
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

                    // TODO verify if the open array was sorted
    const opens = open.filter(({ day }) => day === weekday);
    
    return {
        id,
        name,
        address,
        rating,
        price,
        categories: categories.map(({title}) => title).join(', '),
        reviewCount,
        backgroundImgUrl,
        opens,
        isOpen: _isOpen(opens)
    };
};

const formatString = 'HHmm';

// =============================================

// const theTime1 = moment('0030', formatString);
// console.log(theTime1);
// const theTime2 = moment('0030', formatString).add(1, 'd');
// console.log(theTime2);

// =============================================

// const start = '2000'
// let startTime = moment(start, formatString);
// console.log(startTime.weekday());
// console.log(`before: ${startTime}`);

// if (parseInt(start) < 600) {
//     startTime = startTime.add(1, 'd');
// }

// console.log(`after: ${startTime}`);

// =============================================

const opens = [{
    "start": "0800",
    "end": "1400"
}, {
    "start": "1600",
    "end": "1700"
}, {
    "start": "1800",
    "end": "0200"
}];
// console.log(_isOpen(opens, '1359'));

// =============================================

// console.log(_isOpen(opens));

// =============================================

// 超過7個open object的餐廳，"BING"
// console.log(module.exports.getTheRestaurantDetail(7, moment().weekday()));

// =============================================

// 永和豆漿大王 幾乎每天 00:00 ~ 00:00，另外寫unit test

