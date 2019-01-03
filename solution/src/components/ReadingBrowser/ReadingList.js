// IMPORT PACKAGE REFERENCES=
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES

import { ReadingListItem } from './ReadingListItem';


// COMPONENT
class ReadingList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Fragment>
            {renderList(this.props.reading)}
        </Fragment>;
    }
}

const renderList = reading => (
    <div className="list-group animated fadeIn">
        {reading.map((read, i) => renderListItem(read, i))}
    </div>
);

const renderListItem = (read, index) => (
    <Fragment key={read.id}>
        <ReadingListItem
            timestamp={read.timestamp}
            value1={read.value1}
            value2={read.value2}
            id={read.id}
            index={index}
            updating={false}
        />
    </Fragment>
);

ReadingList.propTypes = {
    reading: PropTypes.array.isRequired
};

export { ReadingList };
