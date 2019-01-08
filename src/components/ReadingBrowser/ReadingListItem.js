import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateReadingAction } from '../state/actions/ReadingActions';
import TableCell from '@material-ui/core/TableCell';


import { InputEditor } from './inputEditor';
import moment from 'moment';

class ReadingListItem extends Component {

    constructor(props) {
        super(props);
        this.updateReading = this.updateReading.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.input1 = React.createRef();
        this.input2 = React.createRef();
    }

    updateReading() {
        const { value1, value2 } = this.props;
        const inputValue1 = parseFloat(this.input1.current.getValue());
        const inputValue2 = parseFloat(this.input2.current.getValue());
        const mustUpdate = value1 !== inputValue1 || value2 !== inputValue2;

        if (mustUpdate) {//fire update action
            this.props.updateReadingAction({
                id: this.props.id,
                value1: this.input1.current.getValue(),
                value2: this.input2.current.getValue(),
                timestamp: this.props.timestamp
            });
        }
    }

    renderRow() {
        const { updateReading, input1, input2 } = this;
        const { id, timestamp, value1, value2, updating, updateFailed, updatingId } = this.props;
        const fromatTimestamp = moment(timestamp).format('D/M/YYYY, h:mm a');
        const saveFailed = updateFailed && updatingId === id;
        const thisUpdating = updating && updatingId === id;

        return (
            <Fragment>
                <TableCell>
                    {fromatTimestamp}
                </TableCell>
                <TableCell align="center" className={'value1'}>
                    <InputEditor
                        busy={thisUpdating}
                        edit={saveFailed}
                        enabled={!updating}
                        defaultValue={parseFloat(value1).toFixed(2)}
                        fieldName={'value1'}
                        id={id}
                        ref={input1}
                        onChange={updateReading} />

                </TableCell>
                <TableCell align="center" className={'value2'}>
                    <InputEditor
                        busy={thisUpdating}
                        defaultValue={parseFloat(value2).toFixed(2)}
                        edit={saveFailed}
                        enabled={!updating}
                        fieldName={'value2'}
                        id={id}
                        ref={input2}
                        onChange={updateReading} />
                </TableCell>
            </Fragment>
        );
    }


    render() {
        const { renderRow } = this;
        return (
            <Fragment>
                {renderRow()}
            </Fragment>
        );
    }
}

ReadingListItem.propTypes = {
    id: PropTypes.string.isRequired,
    value1: PropTypes.number.isRequired,
    value2: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired,
    updating: PropTypes.bool,
    updatingId: PropTypes.string,
    updateFailed: PropTypes.bool,
    updateReadingAction: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    //use ownProps.id to select the specific piece of state to update to props by filtering.
    const { readings } = state;
    const { updatingId, updating, reading, updateFailed } = readings;
    const { id, value1, value2, timestamp } = reading[reading.findIndex(elem => elem.id === ownProps.id)];
    return { id, value1, value2, timestamp, updatingId, updating, updateFailed };
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateReadingAction }, dispatch)
);
const hoc = connect(mapStateToProps, mapDispatchToProps)(ReadingListItem);

export { hoc as ReadingListItem };
