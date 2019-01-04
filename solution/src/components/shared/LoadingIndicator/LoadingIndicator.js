// IMPORT PACKAGE REFERENCES

import React from 'react';
import PropTypes from 'prop-types';


// COMPONENT

const LoadingIndicator = (props) => {
    const { size, right = '', top = '50%', left = '', transform = 'translate(-50%, 0)', busy} = props;
    return (
        <div>
            {
                busy &&
                <div style={{ top: top, left: left, right: right, textAlign: 'center', color: 'dodgerblue', position: 'absolute', transform: transform }}>
                    <i className={`fa fa-spinner fa-spin fa-${size}x fa-fw}`}></i>
                </div>
            }
        </div>
    );
};


// CONFIGURE COMPONENT PROP TYPES

LoadingIndicator.propTypes = {
    busy: PropTypes.bool,
    size: PropTypes.number,
    top: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
    transform: PropTypes.string
};


// EXPORT COMPONENT

export { LoadingIndicator };
