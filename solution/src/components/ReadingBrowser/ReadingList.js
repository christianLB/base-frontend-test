// IMPORT PACKAGE REFERENCES=
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { ReadingListItem } from './ReadingListItem';

const renderList = (reading, busy) => (
    !busy &&
    <Table>
        {
            <TableHead>
                <TableRow>
                    <TableCell>Date/ Time</TableCell>
                    <TableCell><div className={'value1'} style={{marginLeft:'30px'}}>Value1</div></TableCell>
                    <TableCell><div className={'value2'} style={{marginLeft:'30px'}}>value2</div></TableCell>
                </TableRow>
            </TableHead>
        }
        {
            <TableBody>
                {reading.map(read => renderListItem(read))}
            </TableBody>
        }
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
        const { reading, busy } = this.props;
        return <Fragment>
            {renderList(reading, busy)}
        </Fragment>;
    }
}


ReadingList.propTypes = {
    reading: PropTypes.array.isRequired,
    classes: PropTypes.object,
    busy: PropTypes.bool.isRequired
};

export { ReadingList };
