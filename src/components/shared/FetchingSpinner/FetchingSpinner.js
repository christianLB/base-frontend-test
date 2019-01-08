// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchReadingAction } from '../../state/actions/ReadingActions';

import CircularProgress from '@material-ui/core/CircularProgress';


class FetchingSpinner extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { fetching } = this.props;

        return (
            <div className={'cont'}>
                {fetching &&
                  <CircularProgress
                      disableShrink={true}
                      size={40}
                      className={'fetchingSpinner'}/>
                }
            </div>
        );
    }
}

FetchingSpinner.propTypes = {
    fetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    const { fetching } = state.readings;
    return { fetching };
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchReadingAction }, dispatch)
);
const hoc = connect(mapStateToProps, mapDispatchToProps)(FetchingSpinner);

export { hoc as FetchingSpinner };
