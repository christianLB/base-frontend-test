import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateReadingAction } from '../state/actions/ReadingActions';

import { InputEditor } from './inputEditor';
import { LoadingIndicator } from '../shared/LoadingIndicator/LoadingIndicator';
import moment from 'moment';

class ReadingListItem extends Component {

    constructor(props) {
        super(props);
        this.updateReading = this.updateReading.bind(this);
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

    render() {
        const { updateReading, input1, input2 } = this;
        const { id, timestamp, value1, value2, updatingId, updating, updateFailed } = this.props;
        const fromatTimestamp = moment(timestamp).format('D/M/YYYY, h:mm');
        const thisUpdating = updating && updatingId === id;
        const saveFailed = updateFailed && updatingId === id;
        return (
            <a href="#" id={id} className={`list-group-item list-group-item-action flex-row align-items-start ${saveFailed?'saveFailed':''}`}>
                <div className="d-flex w-100 justify-content-between" tabIndex={-1}>
                    {
                        thisUpdating &&
                        <Fragment>
                            <h5 className="mb-1">
                                Saving...:
                            </h5>
                            <h5 className="mb-1">
                                <LoadingIndicator busy={thisUpdating} top={'10'} left={'54%'} size={1} />
                            </h5>
                            <h5 className="mb-1">
                                <LoadingIndicator busy={thisUpdating} top={'10'} right={'2%'} size={1} />
                            </h5>
                        </Fragment>
                    }
                    {
                        !thisUpdating &&
                        <Fragment>
                            <h5 className="mb-1">{fromatTimestamp}</h5>
                            <InputEditor
                                ref={input1}
                                onChange={updateReading}
                                enabled={!updating}
                                edit={saveFailed}
                                defaultValue={parseFloat(value1).toFixed(2)}
                                fieldName={'value1'}
                                id={id} />
                            <InputEditor
                                ref={input2}
                                onChange={updateReading}
                                edit={saveFailed}
                                enabled={!updating}
                                defaultValue={parseFloat(value2).toFixed(2)}
                                fieldName={'value2'}
                                id={id} />
                        </Fragment>
                    }
                </div>
            </a>
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
