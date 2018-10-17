import React from 'react';
import moment from 'moment';
import Tag from './Tag.jsx';

const getStyles = (nameOfBlock, backgroundImage) => {
    const styles = {
        container: {
            // marginBottom: '40px',
            // border: '2px solid blue',
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
            // border: '2px solid red',
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
        }
    };

    return styles[nameOfBlock];
}

const Card = ({
    address, 
    backgroundImgUrl, 
    id, 
    isOpen,
    name, 
    opens = [],

    isSearchResultPage = false,

    price,
    rating,
    categories = []
}) => {
    let backgroundImage = `url(${backgroundImgUrl})`;
    if (!isSearchResultPage && !isOpen) {
        backgroundImage = 'radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), ' + backgroundImage;
        // backgroundImage = 'linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), ' + backgroundImage;
    }

    return (
        <div style={getStyles('container')}>
            <div style={getStyles('backgroundImg', backgroundImage)}>{(!isSearchResultPage && !isOpen) ? 'Closed' : ''}</div>
            <div style={getStyles('contentBox')}>
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
                <p style={{ ...getStyles('paragraphFontStyle'), marginBottom: 0 }}>
                    <div>
                        {`today open: ${opens.map(open => `${open.start} ~ ${open.end}`).join(', ')}`}
                    </div>
                </p>
            </div>
        </div>
    );
};

export default Card;