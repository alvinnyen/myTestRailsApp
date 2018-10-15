import React from 'react';

const getStyles = (nameOfBlock, backgroundImage) => {
    const styles = {
        container: {
            marginBottom: '40px'
        },
        backgroundImg: {
            backgroundImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            borderRadius: '4px',
            height: '200px',
            width: '400px'
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

    isSearchResultPage = false
}) => {
    let backgroundImage = `url(${backgroundImgUrl})`;
    if (!isSearchResultPage && !isOpen) {
        backgroundImage = 'linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), ' + backgroundImage
    }

    return (
        <div style={getStyles('container')}>
            <div style={getStyles('backgroundImg', backgroundImage)}></div>
            <div>{name}</div>
        </div>
    );
};

export default Card;