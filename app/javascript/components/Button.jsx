import React from 'react';
import { Link } from 'react-router-dom';

const getStyles = (nameOfBlock) => {
    const styles = {
        button: {
            display: 'inline-block',
            padding: '8px 16px',
            color: '#fff',
            backgroundColor: 'rgb(225, 0, 80)',
            margin: '8px',
            boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.2), 1px 1px 1px 0px rgba(0, 0, 0, 0.14), 1px 2px 1px -1px rgba(0, 0, 0, 0.12)',
            transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            lineHeight: '1.5',
            fontWeight: '500',
            borderRadius: '4px',
            textDecoration: 'none'
        }
    };

    return styles[nameOfBlock];
}

const Button = ({
    text = '回上一頁',
    backTo = '/',
    style = {}
}) => {
    console.log(`backTo: ${backTo}`);
    console.log(' ');

    return (
        <Link
            to={backTo}
            style={{ ...getStyles('button'), ...style }}
        >
            {text}
        </Link>
    );
};

export default Button;