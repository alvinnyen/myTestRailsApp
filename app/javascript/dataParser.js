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

function _isOpen (opens = [], timeString) {
    return opens.some(({ start, end }) => {
        const formatString = 'HHmm';

        const startTime = moment(start, formatString);

        let endTime = moment(end, formatString);
        // TODO try catch
        if (parseInt(end) < 600) {
            endTime = endTime.add(1, 'd');
        }

        if (timeString) {
            const isBetween = moment(timeString, formatString).isBetween(startTime , endTime);

            console.log(`timeString: ${timeString}`);
            console.log(`startTime: ${startTime}`)
            console.log(`endTime: ${endTime}`)
            console.log(`isBetween: ${isBetween}`);
            console.log(' ');

            return isBetween;
        }
        
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

module.exports.getRestaurantListByTime = function (timeString, weekday) {
    const data = [...rawData];

    const filteredArray = data.filter(({
        hours: {
            0: {
                open = []
            } = {}
        } = {}
    }) => {
        const opens = open.filter(({ day }) => day === weekday);

        return _isOpen(opens, timeString);
    });

    return filteredArray;
};

const testRestaurants = [ {
    "name": "永和豆漿大王",
    "rating": 4,
    "review_count": 128,
    "photos": ["https://s3-media2.fl.yelpcdn.com/bphoto/iJ2yj-A99Dt0xOILHB2akQ/o.jpg"],
    "price": "$",
    "location": {
        "address1": "復興南路二段102號",
        "city": "Da'an District",
        "state": "TPE",
        "country": "TW"
    },
    "categories": [{
        "alias": "breakfast_brunch",
        "title": "Breakfast & Brunch",
        "parent_categories": [{
            "alias": "restaurants",
            "title": "Restaurants"
        }]
    }, {
        "alias": "gourmet",
        "title": "Specialty Food",
        "parent_categories": [{
            "alias": "food",
            "title": "Food"
        }]
    }, {
        "alias": "taiwanese",
        "title": "Taiwanese",
        "parent_categories": [{
            "alias": "restaurants",
            "title": "Restaurants"
        }]
    }],
    "hours": [{
        "open": [{
            "start": "0000",
            "end": "0000",
            "day": 0
        }, {
            "start": "0000",
            "end": "0000",
            "day": 1
        }, {
            "start": "0000",
            "end": "0000",
            "day": 2
        }, {
            "start": "0000",
            "end": "0000",
            "day": 3
        }, {
            "start": "0000",
            "end": "0000",
            "day": 4
        }, {
            "start": "0000",
            "end": "0000",
            "day": 5
        }, {
            "start": "0000",
            "end": "1200",
            "day": 6
        }]
    }],
    "id": 6
}, {
    "name": "BING",
    "rating": 4.5,
    "review_count": 67,
    "photos": ["https://s3-media4.fl.yelpcdn.com/bphoto/JAGaCH66S1qNGzRQCe084w/o.jpg"],
    "price": "$$",
    "location": {
        "address1": "基隆路一段147巷5弄9號",
        "city": "Xinyi District",
        "state": "TPE",
        "country": "TW"
    },
    "categories": [{
        "alias": "burgers",
        "title": "Burgers",
        "parent_categories": [{
            "alias": "restaurants",
            "title": "Restaurants"
        }]
    }, {
        "alias": "tradamerican",
        "title": "American (Traditional)",
        "parent_categories": [{
            "alias": "restaurants",
            "title": "Restaurants"
        }]
    }, {
        "alias": "gastropubs",
        "title": "Gastropubs",
        "parent_categories": [{
            "alias": "restaurants",
            "title": "Restaurants"
        }]
    }],
    "hours": [{
        "open": [{
            "start": "1200",
            "end": "1400",
            "day": 0
        }, {
            "start": "1700",
            "end": "2200",
            "day": 0
        }, {
            "start": "1200",
            "end": "1400",
            "day": 1
        }, {
            "start": "1700",
            "end": "2200",
            "day": 1
        }, {
            "start": "1200",
            "end": "1400",
            "day": 2
        }, {
            "start": "1700",
            "end": "2200",
            "day": 2
        }, {
            "start": "1200",
            "end": "1400",
            "day": 3
        }, {
            "start": "1700",
            "end": "2200",
            "day": 3
        }, {
            "start": "1200",
            "end": "1400",
            "day": 4
        }, {
            "start": "1700",
            "end": "2200",
            "day": 4
        }, {
            "start": "1200",
            "end": "1400",
            "day": 5
        }, {
            "start": "1700",
            "end": "2200",
            "day": 5
        }, {
            "start": "1200",
            "end": "1400",
            "day": 6
        }, {
            "start": "1700",
            "end": "2200",
            "day": 6
        }]
    }],
    "id": 7
}, {
    "name": "Spot Taipei",
    "rating": 4.5,
    "review_count": 79,
    "photos": ["https://s3-media2.fl.yelpcdn.com/bphoto/UGYMDI8QGp21RHtO85WM9w/o.jpg"],
    "price": "$$",
    "location": {
        "address1": "敦化南路ㄧ段233巷58號",
        "city": "Da'an District",
        "state": "TPE",
        "country": "TW"
    },
    "categories": [{
        "alias": "breakfast_brunch",
        "title": "Breakfast & Brunch",
        "parent_categories": [{
            "alias": "restaurants",
            "title": "Restaurants"
        }]
    }, {
        "alias": "tradamerican",
        "title": "American (Traditional)",
        "parent_categories": [{
            "alias": "restaurants",
            "title": "Restaurants"
        }]
    }],
    "hours": [{
        "open": [{
            "start": "1100",
            "end": "2230",
            "day": 0
        }, {
            "start": "1100",
            "end": "2230",
            "day": 1
        }, {
            "start": "1100",
            "end": "2230",
            "day": 2
        }, {
            "start": "1100",
            "end": "2230",
            "day": 3
        }, {
            "start": "1100",
            "end": "2230",
            "day": 4
        }, {
            "start": "1100",
            "end": "2230",
            "day": 5
        }, {
            "start": "1100",
            "end": "2230",
            "day": 6
        }]
    }],
    "id": 8
}, {
    "name": "RAW",
    "rating": 4,
    "review_count": 45,
    "photos": ["https://s3-media1.fl.yelpcdn.com/bphoto/4xGmea0beMbp0mF73EFskg/o.jpg"],
    "price": "$$$",
    "location": {
        "address1": "樂群三路301號",
        "city": "Zhongshan District",
        "state": "TPE",
        "country": "TW"
    },
    "categories": [{
        "alias": "modern_european",
        "title": "Modern European",
        "parent_categories": [{
            "alias": "restaurants",
            "title": "Restaurants"
        }]
    }, {
        "alias": "asianfusion",
        "title": "Asian Fusion",
        "parent_categories": [{
            "alias": "restaurants",
            "title": "Restaurants"
        }]
    }],
    "hours": [{
        "open": [{
            "start": "1130",
            "end": "1430",
            "day": 2
        }, {
            "start": "1800",
            "end": "2200",
            "day": 2
        }, {
            "start": "1130",
            "end": "1430",
            "day": 3
        }, {
            "start": "1800",
            "end": "2200",
            "day": 3
        }, {
            "start": "1130",
            "end": "1430",
            "day": 4
        }, {
            "start": "1800",
            "end": "2200",
            "day": 4
        }, {
            "start": "1130",
            "end": "1430",
            "day": 5
        }, {
            "start": "1800",
            "end": "2200",
            "day": 5
        }, {
            "start": "1130",
            "end": "1430",
            "day": 6
        }, {
            "start": "1800",
            "end": "2200",
            "day": 6
        }]
    }],
    "id": 9
}, {
    "name": "大腕燒肉專門店",
    "rating": 4.5,
    "review_count": 35,
    "photos": ["https://s3-media4.fl.yelpcdn.com/bphoto/PSlmx16P0zwVd5rBH87FvA/o.jpg"],
    "price": "$$$",
    "location": {
        "address1": "敦化南路一段177巷22號",
        "city": "Da'an District",
        "state": "TPE",
        "country": "TW"
    },
    "categories": [{
        "alias": "bbq",
        "title": "Barbeque",
        "parent_categories": [{
            "alias": "restaurants",
            "title": "Restaurants"
        }]
    }, {
        "alias": "japanese",
        "title": "Japanese",
        "parent_categories": [{
            "alias": "restaurants",
            "title": "Restaurants"
        }]
    }],
    "hours": [{
        "open": [{
            "start": "1800",
            "end": "0000",
            "day": 0
        }, {
            "start": "1800",
            "end": "0000",
            "day": 1
        }, {
            "start": "1800",
            "end": "0000",
            "day": 2
        }, {
            "start": "1800",
            "end": "0000",
            "day": 3
        }, {
            "start": "1800",
            "end": "0200",
            "day": 4
        }, {
            "start": "1800",
            "end": "0200",
            "day": 5
        }, {
            "start": "1800",
            "end": "0000",
            "day": 6
        }]
    }],
    "id": 10
}];

module.exports.getRestaurantListByTime = function (timeString, weekday) {
    const data = [...rawData];
    // const data = [...testRestaurants];

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
        const opens = open.filter(({ day }) => day === weekday);

        return ({
                address,
                backgroundImgUrl,
                id,
                name,
                opens
                // ,
                // isOpen: _isOpen(opens) // 不需要，因為經過filter的餐廳都是在特定時間點有open的
        });
    });

    return restaurantListByTime;
};

// console.log(module.exports.getRestaurantListByTime('2000', moment().weekday()));
