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
        const { reading, updatingId } = this.props;
        return <Fragment>
            {renderList(reading, updatingId)}
        </Fragment>;
    }
}

const renderList = (reading, updatingId, updating) => (
    <div className="list-group animated fadeIn">
        {reading.map((read, i) => renderListItem(read, i, updatingId), updating)}
    </div>
);


const renderListItem = (read, index, updatingId = '', updating = false) => (
    <Fragment key={read.id}>
        <ReadingListItem
            timestamp={read.timestamp}
            value1={read.value1}
            value2={read.value2}
            id={read.id}
            index={index}
            updating={updating}
            updatingId={updatingId}
        />
    </Fragment>
);

ReadingList.propTypes = {
    reading: PropTypes.array.isRequired,
    updatingId: PropTypes.string.isRequired
};

export { ReadingList };
