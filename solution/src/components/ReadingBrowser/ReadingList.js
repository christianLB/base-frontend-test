// IMPORT PACKAGE REFERENCES=
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// IMPORT PROJECT REFERENCES

import { ReadingListItem } from './ReadingListItem';

class ReadingList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { reading } = this.props;
        return <Fragment>
            {renderList(reading)}
        </Fragment>;
    }
}

const renderList = (reading, updatingId, updating) => (
    <div className="list-group animated fadeIn">
        {reading.map(read => renderListItem(read, updatingId), updating)}
    </div>
);


const renderListItem = (read) => (
    <Fragment key={read.id}>
        <ReadingListItem
            timestamp={read.timestamp}
            value1={read.value1}
            value2={read.value2}
            id={read.id}
        />
    </Fragment>
);

ReadingList.propTypes = {
    reading: PropTypes.array.isRequired
};

export { ReadingList };
