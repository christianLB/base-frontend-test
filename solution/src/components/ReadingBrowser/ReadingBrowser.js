// IMPORT PACKAGE REFERENCES
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Chart } from './Chart';
import { fetchReadingAction, changeRangeAction } from '../state/actions/ReadingActions';
import { ReadingList } from './ReadingList';
import { LoadingIndicator } from '../shared/LoadingIndicator/LoadingIndicator';
import { Error } from '../shared/Error/Error';
import { RangeSelect } from './RangeSelect';


class ReadingBrowser extends Component {

    constructor(props) {
        super(props);
        this.mainCont = React.createRef();
        this.changeRange = this.changeRange.bind(this);
    }

    componentDidMount() {
        this.props.fetchReadingAction(this.props.range);
    }

    changeRange(range) {
        this.props.changeRangeAction(range);
        this.props.fetchReadingAction(range);
    }

    render() {
        const { reading, fetched, fetching, fetchFailed, updatingId, results } = this.props;
        const { mainCont, changeRange } = this;
        return (
            <div ref={mainCont}>
                {
                    <RangeSelect onChange={changeRange} />
                }
                {
                    fetched &&
                    <Fragment>
                        <Chart reading={reading}
                            width={mainCont.current.clientWidth}
                            height={400}
                        />
                        {
                            fetchFailed && <Error message="Failed to fetch reading" />
                        }
                        {
                            results &&
                            <ReadingList reading={reading} updatingId={updatingId}/>
                        }
                        {
                            !results && <h2 className='display-5 noresults'>No results</h2>
                        }
                    </Fragment>
                }
                {
                    <LoadingIndicator busy={fetching} size={4} left={'50%'} />
                }
            </div>
        );
    }
}

ReadingBrowser.propTypes = {
    fetchReadingAction: PropTypes.func.isRequired,
    changeRangeAction: PropTypes.func.isRequired,
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchFailed: PropTypes.bool,
    reading: PropTypes.array.isRequired,
    range: PropTypes.object.isRequired,
    results: PropTypes.bool.isRequired,
    updating: PropTypes.bool.isRequired,
    updatingId: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    const {
        fetching,
        fetched,
        fetchFailed,
        reading,
        range,
        updating,
        updateFailed,
        updatingId,
        results } = state.readings;

    return {
        fetching,
        fetched,
        fetchFailed,
        reading,
        range,
        updating,
        updateFailed,
        updatingId,
        results };
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({ changeRangeAction, fetchReadingAction  }, dispatch)
);
const hoc = connect(mapStateToProps, mapDispatchToProps)(ReadingBrowser);

export { hoc as ReadingBrowser };
