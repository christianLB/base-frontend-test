import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateReadingAction } from '../state/actions/ReadingActions';

import moment from 'moment';
import InputRange from 'react-input-range';
import { LineChart } from 'react-easy-chart';

import 'react-input-range/lib/css/index.css';

class Chart extends Component {
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formatLabel = this.formatLabel.bind(this);
        this.state = {
            data: this.getLines2(),
            zoomRange: [0, 5],
            value: {min: 0, max: 1},
            zoom: true,
            width: 0
        };

        this.style = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        };
    }

    getLines() {
        const lines = [];

        const line1 = this.getLine('value1');
        const line2 = this.getLine('value2');
        lines.push(line1, line2);
        return lines;
    }

    getLines2() {
        //getLines2 will switch on mocked data for testing the graphic component.
        const lines = [];

        const line1 = this.getLine2('value1');
        const line2 = this.getLine2('value2');
        lines.push(line1, line2);

        return lines;
    }

    getLine(fieldName) {
        const { reading } = this.props;
        const { state } = this;
        const value = state.value;
        let out = [];

        if (state.zoom) {
            out = reading.filter((el, i) => {
                //return i >= value.min && i <= value.max;
                return i <= reading.length-1-value.min && i >= reading.length-1-value.max;
            });
        } else {
            out = reading;
        }
        return out.map((elem) => {
            return {x: moment(elem.timestamp).format('DD-MMM-YY HH:mm'), y: parseFloat(parseFloat(elem[fieldName]).toFixed(2))};
        });
    }



    getLine2() {
        const rndCant = parseInt(Math.random() * (200 - 100) + 100);
        var reading = new Array(rndCant).fill({});

        const out = reading.map(() => {
            const rndAddTime = Math.random() * (3 - 1) + 1;
            const rndTimestamp = moment().subtract(rndAddTime, 'h').format('DD-MMM-YY HH:mm');
            const rndValue = Math.random() * (15 - -15) + -15;
            return {x: rndTimestamp, y: parseFloat(parseFloat(rndValue).toFixed(2))};
        });

        return out;
    }

    update() {
        this.setState({
            data: this.getLines2()
        });
    }

    handleClick() {
        const { state } = this;
        this.setState({
            zoom: !state.zoom,
            value: {min: 0, max: 5}
        });
    }

    handleChange(v) {
        this.setState({value: v});
    }

    formatLabel(a) {
        if(this.props.reading[this.props.reading.length-1-a]) {
            return moment(this.props.reading[this.props.reading.length-1-a].timestamp).format('DD-MMM-YY h:m a');
        }
    }

    componentDidUpdate() {
        if (this.props.reading.length > 0 && this.state.value.max == 1) {
            this.setState({
                value: {min: 0, max: this.props.reading.length-1}
            });
        }
    }

    render() {
        const { height, range, width, reading } = this.props;
        const { state, handleChange, formatLabel, style } = this;
        const { value } = state;

        return <Fragment>

            <div style={{...style, width}}>
                {
                    state.zoom && reading.length > 0 &&
                    <div style={{width: width - width * 0.10, marginBottom: '15px' }}>
                        <InputRange
                            maxValue={reading.length > 0 ? reading.length : 1}
                            minValue={0}
                            value={value}
                            allowSameValues={false}
                            draggableTrack={true}
                            formatLabel={formatLabel}
                            style={{marginLeft: '15px'}}
                            onChange={handleChange} />
                    </div>
                }
                <LineChart
                    axes
                    grid
                    verticalGrid
                    xTicks={state.zoom?30:range.hours}
                    xType={'time'}
                    datePattern={'%d-%b-%y %H:%M'}
                    yDomainRange={[-20, 20]}
                    axisLabels={{x: 'Hour', y: 'Reading'}}
                    lineColors={['red', 'blue']}
                    height={height}
                    width={width}
                    interpolate={'cardinal'}
                    data={this.getLines()}
                />
            </div>
        </Fragment>;
    }
}

Chart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number.isRequired,
    reading: PropTypes.array.isRequired,
    updatingId: PropTypes.bool,
    range: PropTypes.object.isRequired,
    ref: PropTypes.object,
    updateReadingAction: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
    const { reading, updating, range } = state.readings;

    return { reading, updating, range };
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateReadingAction }, dispatch)
);
const hoc = connect(mapStateToProps, mapDispatchToProps)(Chart);

export { hoc as Chart };
