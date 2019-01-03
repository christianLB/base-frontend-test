import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateReadingAction } from '../state/actions/ReadingActions';

import { InputEditor } from './inputEditor';
import moment from 'moment';

class ReadingListItem extends Component {

    constructor(props) {
        super(props);
        this.updateReading = this.updateReading.bind(this);
        this.input1 = React.createRef();
        this.input2 = React.createRef();
    }

    updateReading() {
        this.props.updateReadingAction({
            id: this.props.id,
            value1: this.input1.current.getValue(),
            value2: this.input2.current.getValue(),
            timestamp: this.props.timestamp
        }, this.props.index);
    }

    render() {
        const { id, timestamp, value1, value2, updating } = this.props;
        const fromatTimestamp = moment(timestamp).format('D/M/YYYY, h:mm');

        return (
            <a href="#" id={id} className="list-group-item list-group-item-action flex-row align-items-start">
                {updating && <span>updating</span>}
                <div className="d-flex w-100 justify-content-between" tabIndex={-1}>
                    <h5 className="mb-1">{fromatTimestamp}</h5>
                    <InputEditor
                        ref={this.input1}
                        onChange={this.updateReading}
                        enabled={!this.props.updating}
                        defaultValue={parseFloat(value1).toFixed(2)}
                        fieldName={'value1'}
                        id={id} />
                    <InputEditor
                        ref={this.input2}
                        onChange={this.updateReading}
                        enabled={!this.props.updating}
                        defaultValue={parseFloat(value2).toFixed(2)}
                        fieldName={'value2'}
                        id={id} />
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
    updating: PropTypes.bool.isRequired,
    updateReadingAction: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
    // I use ownProps here because index to refer to the specific piece of state to update,
    // comes from outside so, is a prop of the component itself.
    const { id, value1, value2, timestamp, updating = false } = state.readings.reading[ownProps.index];

    return { id, value1, value2, timestamp, updating };
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateReadingAction }, dispatch)
);
const hoc = connect(mapStateToProps, mapDispatchToProps)(ReadingListItem);

export { hoc as ReadingListItem };
