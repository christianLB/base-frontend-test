import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateReadingAction } from '../state/actions/ReadingActions';

import moment from 'moment';
import Button from '@material-ui/core/Button';
import InputRange from 'react-input-range';
import { LineChart } from 'react-easy-chart';

import 'react-input-range/lib/css/index.css';

class Chart extends Component {
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRight = this.handleRight.bind(this);
        this.handleLeft = this.handleLeft.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.formatLabel = this.formatLabel.bind(this);
        this.state = {
            data: this.getLines2(),
            zoomRange: [0, 5],
            value: {min: 0, max: 5},
            zoom: false,
            width: 0
        };

        this.style = {
            position: 'absolute'
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
                return i >= value.min && i <= value.max;
            });
            // console.log(zoomRange[0], zoomRange[1], out);
        } else {
            out = reading;
        }
        //out = out.reverse();
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

    handleRight() {
        const increment = 1;
        const { state } = this;
        const newZoom = {min: state.value.min + increment, max: state.value.max + increment};

        this.setState({
            value: newZoom
        });
    }

    handleLeft() {
        const increment = 1;
        const { state } = this;
        const newZoom = [state.value.min - increment, state.value.max - increment];

        this.setState({
            value: newZoom
        });
    }

    handleChange(v) {
        this.setState({value: v});
    }

    formatLabel(a) {
        if(this.props.reading[a]) {
            return moment(this.props.reading[a].timestamp).format('DD-MMM-YY HH:mm');
        }
    }

    render() {
        const { height, range, width, reading } = this.props;
        const { handleClick, state, style, handleChange, formatLabel } = this;
        const { value } = state;

        return <Fragment>
            <div className="controls" style={style}>
                <Button
                    variant={'contained'}
                    onClick={handleClick}
                >Zoom
                </Button>
                {
                    state.zoom && reading.length > 0 &&
                      <div style={{margin: '0px 0px 0px 50px', width: '400px'}}>
                          <InputRange
                              maxValue={reading.length-1}
                              minValue={0}
                              value={value}
                              allowSameValues={false}
                              draggableTrack={true}
                              formatLabel={formatLabel}
                              style={{marginLeft: '15px'}}
                              onChange={handleChange} />
                      </div>
                }
            </div>
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
