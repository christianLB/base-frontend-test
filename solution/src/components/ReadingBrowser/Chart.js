import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateReadingAction } from '../state/actions/ReadingActions';

import moment from 'moment';
import { LineChart } from 'react-easy-chart';

class Chart extends Component {
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
        this.state = {
            data: this.getLines2()
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
        return reading.map((elem) => {
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


    render() {
        const { width, height } = this.props;
        return <Fragment>
            <LineChart
                axes
                grid
                verticalGrid
                xTicks={5}
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
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    reading: PropTypes.array.isRequired,
    updatingId: PropTypes.bool,
    updateReadingAction: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
    const { reading, updating } = state.readings;

    return { reading, updating };
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateReadingAction }, dispatch)
);
const hoc = connect(mapStateToProps, mapDispatchToProps)(Chart);

export { hoc as Chart };
