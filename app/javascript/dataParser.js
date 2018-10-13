const rawData = require('./data.json');

function getRestaurantList (weekday) {
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
    }) => ({
        address,
        backgroundImgUrl,
        id,
        name,
        start: open[weekday] && open[weekday].start,
        end: open[weekday] && open[weekday].end
    }));
}