// IMPORT PACKAGE REFERENCES=
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { ReadingListItem } from './ReadingListItem';

const renderList = (reading, updatingId, updating) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell  style={{position:'sticky'}}>Date/ Time</TableCell>
                <TableCell  style={{position:'sticky'}}>Value1</TableCell>
                <TableCell  style={{position:'sticky'}}>value2</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {reading.map(read => renderListItem(read, updatingId), updating)}
        </TableBody>
    </Table>
);


const renderListItem = (read) => (
    <TableRow key={read.id}>
        <ReadingListItem
            timestamp={read.timestamp}
            value1={read.value1}
            value2={read.value2}
            id={read.id}
        />
    </TableRow>
);

class ReadingList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { reading } = this.props;
        return <Fragment>
            <Paper>
                {renderList(reading)}
            </Paper>
        </Fragment>;
    }
}


ReadingList.propTypes = {
    reading: PropTypes.array.isRequired,
    classes: PropTypes.object
};

export { ReadingList };
