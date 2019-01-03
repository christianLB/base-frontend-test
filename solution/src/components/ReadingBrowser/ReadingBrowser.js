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
        const { reading, fetched, fetching, failed, indexUpdated, results } = this.props;
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
                            indexUpdated={indexUpdated}
                            width={mainCont.current.clientWidth}
                            height={350}
                        />
                        {
                            results &&
                            <Fragment>
                                <div className="list-group animated fadeIn">
                                    <a href="#" id={-1} className="list-group-item list-group-item-action flex-row align-items-start fixed">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">date/time</h5>
                                            <h5 className="mb-1 value1">value1</h5>
                                            <h5 className="mb-1 value2">value2</h5>
                                        </div>
                                    </a>
                                </div>
                                <div className='roller'>
                                    <ReadingList reading={reading} />
                                </div>
                            </Fragment>
                        }
                        {
                            !results && <h2>No results</h2>
                        }
                    </Fragment>
                }
                {
                    <LoadingIndicator busy={fetching} />
                }
                {
                    failed && <Error message="Failed to fetch reading" />
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
    failed: PropTypes.bool,
    reading: PropTypes.array.isRequired,
    range: PropTypes.object.isRequired,
    results: PropTypes.bool.isRequired,
    indexUpdated: PropTypes.number.isRequired
};

const mapStateToProps = state => {
    const { fetching, fetched, failed, reading, range, indexUpdated, updating, results } = state.readings;

    return { fetching, fetched, failed, reading, range, indexUpdated, updating, results };
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({ changeRangeAction, fetchReadingAction  }, dispatch)
);
const hoc = connect(mapStateToProps, mapDispatchToProps)(ReadingBrowser);

export { hoc as ReadingBrowser };
