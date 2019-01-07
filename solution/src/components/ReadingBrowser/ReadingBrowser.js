// IMPORT PACKAGE REFERENCES
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Chart } from './Chart';
import { fetchReadingAction, changeRangeAction, clearUpdatedAction } from '../state/actions/ReadingActions';
import { ReadingList } from './ReadingList';
import { Error } from '../shared/Error/Error';
import { RangeSelect } from './RangeSelect';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';


class ReadingBrowser extends Component {

    constructor(props) {
        super(props);
        this.mainCont = React.createRef();
        this.changeRange = this.changeRange.bind(this);
        this.state = {
            chartWidth: 0
        };
    }

    componentDidMount() {
        this.props.fetchReadingAction(this.props.range);
        this.setState({chartWidth: this.mainCont.current.clientWidth});
    }

    changeRange(range) {
        this.props.changeRangeAction(range);
        this.props.fetchReadingAction(range);
    }

    clearUpdated(){
        const {updated, clearUpdatedAction, updateFailed } = this.props;
        if (updated||updateFailed) {
            setTimeout(() => {
                clearUpdatedAction();
            }, 2000);
        }
    }

    componentDidUpdate() {
        this.clearUpdated();
    }

    render() {
        const { reading, fetched, fetching, fetchFailed, updatingId, results, updated, updateFailed } = this.props;
        const { mainCont, changeRange, state } = this;
        const { chartWidth } = state;
        updated && clearTimeout();
        return (
            <div ref={mainCont}>
                {
                    <Fragment>
                        <Paper>
                            {<RangeSelect onChange={changeRange} />}
                            {<Chart reading={reading}
                                height={400}
                                width={chartWidth}
                            />}
                        </Paper>
                        {
                            fetchFailed && <Error message="Failed to fetch reading" />
                        }
                        {
                            results &&
                            <div className={'scroll'}>
                                <ReadingList reading={reading} busy={fetching} updatingId={updatingId}/>
                            </div>
                        }
                        {
                            fetched && !results && <h2 style={{textAlign: 'center', marginTop: '20px'}}>No results</h2>
                        }
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            variant={updateFailed?'error':'info'}
                            open={updated||updateFailed}
                            autoHideDuration={6000}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{updateFailed?'Saving failed...':'Reading updated.'}</span>}
                        />
                    </Fragment>
                }
            </div>
        );
    }
}

ReadingBrowser.propTypes = {
    fetchReadingAction: PropTypes.func.isRequired,
    changeRangeAction: PropTypes.func.isRequired,
    clearUpdatedAction: PropTypes.func.isRequired,
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchFailed: PropTypes.bool,
    reading: PropTypes.array.isRequired,
    range: PropTypes.object.isRequired,
    results: PropTypes.bool.isRequired,
    updating: PropTypes.bool.isRequired,
    updatingId: PropTypes.string.isRequired,
    updateFailed: PropTypes.bool.isRequired,
    updated: PropTypes.bool.isRequired
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
        updated,
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
        updated,
        results };
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({ changeRangeAction, fetchReadingAction, clearUpdatedAction }, dispatch)
);
const hoc = connect(mapStateToProps, mapDispatchToProps)(ReadingBrowser);

export { hoc as ReadingBrowser };
