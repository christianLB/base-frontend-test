import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateReadingAction } from '../state/actions/ReadingActions';

import moment from 'moment';
import Button from '@material-ui/core/Button';
import { LineChart } from 'react-easy-chart';

class Chart extends Component {
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRight = this.handleRight.bind(this);
        this.handleLeft = this.handleLeft.bind(this);
        this.state = {
            data: this.getLines2(),
            zoomRange: [0, 5],
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
        const zoomRange = state.zoomRange;
        let out = [];

        if (state.zoom) {
            out = reading.filter((el, i) => {
                return i >= zoomRange[0] && i <= zoomRange[1];
            });
            // console.log(zoomRange[0], zoomRange[1], out);
        } else {
            out = reading;
        }
        out = out.reverse();
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
            zoomRange: [0, 5]
        });
    }

    handleRight() {
        const increment = 1;
        const { state } = this;
        const newZoom = [state.zoomRange[0] + increment, state.zoomRange[1] + increment];

        this.setState({
            zoomRange: newZoom
        });
    }

    handleLeft() {
        const increment = 1;
        const { state } = this;
        const newZoom = [state.zoomRange[0] - increment, state.zoomRange[1] - increment];

        this.setState({
            zoomRange: newZoom
        });
    }

    render() {
        const { height, range, width } = this.props;
        const { handleClick, handleRight, handleLeft, state, style } = this;
        
        return <Fragment>
            <div className="controls" style={style}>
                <Button
                    variant={'contained'}
                    onClick={handleClick}
                >Zoom
                </Button>
                {
                    state.zoom &&
                      <div>
                          <Button
                              variant={'contained'}
                              onClick={handleLeft}
                          >
                              {'<---'}
                          </Button>
                          <Button
                              variant={'contained'}
                              onClick={handleRight}
                          >
                              {'--->'}
                          </Button>
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
