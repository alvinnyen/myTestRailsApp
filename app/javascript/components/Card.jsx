import React from 'react';
import Tag from './Tag.jsx';
import { weekDayMap } from '../configs/langMap.js';

const getStyles = (nameOfBlock, backgroundImage) => {
    const styles = {
        container: {
            display: 'inline-block',
            boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.2), 1px 1px 1px 0px rgba(0, 0, 0, 0.14), 1px 2px 1px -1px rgba(0, 0, 0, 0.12)',
            borderRadius: '10px'
        },
        backgroundImg: {
            backgroundImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            height: '140px',
            width: '600px',

            color: 'red',
            fontSize: '40px',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: '140px',
            borderRadius: '10px 10px 0 0'
        },
        contentBox: {
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
        priceSpan: {
            color: '#FFD700',
            fontWeight: 600
        },
        divideSign: {
            color: 'rgba(0, 0, 0, 0.87)'
        },
        todayOpenParagraph: {
            ...this.paragraphFontStyle,
            margin: '0 auto'
        }
    };

    return styles[nameOfBlock];
}

const Card = ({
    address = '',
    backgroundImgUrl = '', 
    // id = -1,
    isOpen = false,
    name = '',
    opens = [],

    isSearchResultPage = false,

    price = '',
    rating = 0,
    categories = [],

    searchWeekday = ''
}) => {
    let backgroundImage = `url(${backgroundImgUrl})`;
    if (!isSearchResultPage && !isOpen) {
        backgroundImage = 'radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), ' + backgroundImage;
    }

    const todayOpen = !opens.length ? '' : 
                        `${weekDayMap[searchWeekday] || 'today'} open: ` + opens.map((open = {}) => `${open.start} ~ ${open.end}`).join(', ');

    const isClosed = (!isSearchResultPage && !isOpen) ? 'Closed' : '';

    const tags = categories.map((title, index) => (<Tag key={index} text={title} />));

    const ratingString = `rating: ${rating} / 5`;

    return (
        <div style={getStyles('container')}>
            <div style={getStyles('backgroundImg', backgroundImage)}>{isClosed}</div>
            <div style={getStyles('contentBox')}>
                <h2 style={getStyles('titleFontStyle')}>{name}</h2>
                <p style={getStyles('paragraphFontStyle')}>
                    <span>{address}</span>
                    <span style={getStyles('priceSpan')}>
                        <span>{price}</span>
                        <span style={getStyles('divideSign')}> / </span>
                        <span>$$$</span>
                    </span>
                </p>
                <p style={getStyles('paragraphFontStyle')}>
                    <span>{tags}</span>
                    <span>{ratingString}</span>
                </p>
                <p style={getStyles('todayOpenParagraph')}>
                    <span>
                        {todayOpen}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Card;
