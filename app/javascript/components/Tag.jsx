import React from 'react';

const getStyles = (nameOfBlock) => {
    const styles = {
        container: {
            padding: '2px 4px',
            borderRadius: '4px',
            color: 'white',
            backgroundColor: 'blue',
            marginRight: '4px'
        },
    }
    return styles[nameOfBlock];
};

const Tag = ({text}) => {
    return (
        <span style={getStyles('container')}>{text}</span>
    );
};

export default Tag;